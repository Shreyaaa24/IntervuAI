const Groq = require("groq-sdk");
const Interview = require("../models/Interview.js");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const MODEL = "openai/gpt-oss-120b";

const systemPrompt = (domain) =>
  `
You are a senior technical interviewer conducting a mock interview for a ${domain} developer role.
Ask one clear, specific technical question at a time.
After the candidate answers, provide feedback and the next question.

Return ONLY the question, nothing else.
`.trim();

// ── Start Interview ───────────────────────────────────────
const startInterview = async (req, res) => {
  try {
    const { domain } = req.body;

    if (!domain) {
      return res.status(400).json({
        message: "Domain is required",
      });
    }

    const completion = await groq.chat.completions.create({
      model: MODEL,
      messages: [
        {
          role: "system",
          content: systemPrompt(domain),
        },
        {
          role: "user",
          content: `Start the interview. Ask me the first ${domain} technical question. Only ask the question, no preamble.`,
        },
      ],
      temperature: 0.7,
      max_completion_tokens: 200,
    });

    const firstQuestion =
      completion.choices?.[0]?.message?.content ||
      "Tell me about yourself and your experience.";

    const interview = await Interview.create({
      userId: req.userId,
      domain,
      messages: [
        {
          role: "assistant",
          content: firstQuestion,
        },
      ],
      questionsAnswered: [],
      isCompleted: false,
    });

    res.status(201).json({
      sessionId: interview._id,
      question: firstQuestion,
    });
  } catch (err) {
    console.error("startInterview error:", err);

    res.status(500).json({
      message: "Failed to start interview",
      error: err.message,
    });
  }
};

// ── Submit Answer ─────────────────────────────────────────
const submitAnswer = async (req, res) => {
  try {
    const {
      sessionId,
      answer,
      domain = "General",
      questionsAnswered = 0,
    } = req.body;

    if (!sessionId || !answer) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    const interview = await Interview.findOne({
      _id: sessionId,
      userId: req.userId,
    });

    if (!interview) {
      return res.status(404).json({
        message: "Session not found",
      });
    }

    // Convert frontend question number into a number safely
    const currentQuestionNumber = Number(questionsAnswered) || 0;

    // ── Generate feedback ─────────────────────────────────
    const feedbackResponse = await groq.chat.completions.create({
      model: MODEL,
      messages: [
        {
          role: "user",
          content: `You are an expert ${domain} interview evaluator.

Provide constructive feedback on this interview answer in 2-3 sentences.

Focus on:
- Clarity and structure of the response
- Technical accuracy and depth
- Communication skills
- Areas for improvement

Answer: "${answer}"

Return ONLY the feedback, no additional text.`,
        },
      ],
      temperature: 0.7,
      max_completion_tokens: 200,
    });

    const feedback =
      feedbackResponse.choices?.[0]?.message?.content?.trim() ||
      "Your answer was evaluated successfully.";

    // ── Save candidate answer ──────────────────────────────
    interview.messages.push({
      role: "user",
      content: answer,
      timestamp: new Date(),
    });

    // ── Save AI feedback ───────────────────────────────────
    interview.messages.push({
      role: "assistant",
      content: feedback,
      timestamp: new Date(),
    });

    // Store answered question numbers as strings
    if (!Array.isArray(interview.questionsAnswered)) {
      interview.questionsAnswered = [];
    }

    interview.questionsAnswered.push(String(currentQuestionNumber + 1));

    // Complete after 3 questions
    const isComplete = currentQuestionNumber >= 2;

    // ── Complete path ──────────────────────────────────────
    if (isComplete) {
      const scoreResponse = await groq.chat.completions.create({
        model: MODEL,
        messages: [
          {
            role: "user",
            content: `Rate this interview answer on a scale of 10-100 for a ${domain} position.

Consider:
- Technical accuracy
- Communication
- Problem-solving
- Depth of understanding

Return ONLY a number between 10-100, nothing else.

Answer: "${answer}"`,
          },
        ],
        temperature: 0.5,
        max_completion_tokens: 10,
      });

      const scoreRaw =
        scoreResponse.choices?.[0]?.message?.content?.trim() || "75";

      const score = Math.max(
        10,
        Math.min(100, parseInt(scoreRaw) || 75)
      );

      interview.score = score;
      interview.isCompleted = true;
      interview.feedback = feedback;

      interview.duration = Math.max(
        1,
        Math.round(
          (Date.now() - interview.createdAt.getTime()) / 60000
        )
      );

      await interview.save();

      return res.json({
        feedback,
        score,
        isComplete: true,
      });
    }

    // ── Generate next question ─────────────────────────────
    const nextQuestionResponse = await groq.chat.completions.create({
      model: MODEL,
      messages: [
        {
          role: "user",
          content: `You are an expert ${domain} interviewer.

Generate the NEXT interview question based on the previous answer.

The question should:
- Be different from typical generic interview questions
- Build on topics relevant to ${domain}
- Be open-ended and professional
- Test deeper understanding of the domain

Previous answer context:
"${answer.substring(0, 300)}..."

Return ONLY the new question, nothing else.`,
        },
      ],
      temperature: 0.7,
      max_completion_tokens: 150,
    });

    const nextQuestion =
      nextQuestionResponse.choices?.[0]?.message?.content?.trim() ||
      `Explain an important concept in ${domain} that you would expect an experienced developer to understand.`;

    await interview.save();

    return res.json({
      feedback,
      nextQuestion,
      isComplete: false,
    });
  } catch (err) {
    console.error("submitAnswer error:", err);

    res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};

// ── Get All Completed Interviews ──────────────────────────
const getInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find({
      userId: req.userId,
      isCompleted: true,
    })
      .select("domain score duration questionsAnswered createdAt")
      .sort({ createdAt: -1 });

    const mapped = interviews.map((i) => ({
      id: i._id,
      topic: i.domain,
      score: i.score,
      duration: i.duration,
      date: i.createdAt,
    }));

    res.json({
      interviews: mapped,
    });
  } catch (err) {
    console.error("getInterviews error:", err);

    res.status(500).json({
      message: "Failed to fetch interviews",
      error: err.message,
    });
  }
};

// ── Get Single Interview ──────────────────────────────────
const getInterview = async (req, res) => {
  try {
    const interview = await Interview.findOne({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!interview) {
      return res.status(404).json({
        message: "Interview not found",
      });
    }

    res.json({
      interview,
    });
  } catch (err) {
    console.error("getInterview error:", err);

    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};

module.exports = {
  startInterview,
  submitAnswer,
  getInterviews,
  getInterview,
};