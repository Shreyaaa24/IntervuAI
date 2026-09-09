const Groq = require("groq-sdk");

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

const DOMAINS = [
    "JavaScript/Node.js",
    "React",
    "Python",
    "Data Science",
    "DevOps",
    "System Design",
    "Database Design",
    "General",
];

async function extractTextFromPDF(buffer) {
    const pdfjslib = await import("pdfjs-dist/legacy/build/pdf.mjs");

    const uint8Array = new Uint8Array(buffer);

    const loadingTask = pdfjslib.getDocument({
        data: uint8Array,
    });

    const pdf = await loadingTask.promise;

    let textContent = "";

    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();

        const strings = content.items.map((item) => item.str);

        textContent += strings.join(" ") + "\n";
    }

    return textContent;
}

async function analyzeResume(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "Resume file is required",
            });
        }

        const text = await extractTextFromPDF(req.file.buffer);

        if (!text.trim()) {
            return res.status(400).json({
                message: "Could not extract text from resume",
            });
        }

        const prompt = `
Analyze the following resume carefully.

Return ONLY valid JSON.
Do not use markdown.
Do not add \`\`\`json.
Do not add any explanation outside the JSON.

The JSON MUST have exactly these fields:

{
  "summary": "A detailed 3-5 sentence summary of the candidate's profile, technical skills, projects, experience level, and areas for improvement.",
  "strengths": [
    "strength 1",
    "strength 2",
    "strength 3",
    "strength 4"
  ],
  "recommendedDomains": [
    {
      "label": "one domain from the allowed list",
      "reason": "Why this domain matches the candidate's resume",
      "confidence": 85
    }
  ],
  "experienceLevel": "Junior",
  "skillsDetected": [
    "skill 1",
    "skill 2",
    "skill 3"
  ]
}

Allowed domains:
${DOMAINS.join(", ")}

Rules:

1. "summary" must be a real paragraph, NOT just "Junior Level".
2. The summary should mention the candidate's strongest technical skills.
3. Mention relevant projects and practical experience.
4. Mention the candidate's current experience level naturally.
5. Mention 1-3 areas where the candidate can improve.
6. "strengths" must contain useful resume-specific strengths.
7. "skillsDetected" must contain actual technical skills found in the resume.
8. "recommendedDomains" should contain 2-4 suitable domains.
9. "confidence" must be a number between 0 and 100.
10. "experienceLevel" must be exactly one of:
   "Junior", "Mid", or "Senior".

Resume:

${text}
`;

        const completion = await groq.chat.completions.create({
            model: "openai/gpt-oss-120b",
            messages: [
                {
                    role: "system",
                    content:
                        "You are an expert resume analyzer and technical career coach. Always follow the requested JSON structure exactly.",
                },
                {
                    role: "user",
                    content: prompt,
                },
            ],
            temperature: 0.3,
            max_completion_tokens: 1500,
        });

        const rawResult =
            completion.choices?.[0]?.message?.content?.trim();

        if (!rawResult) {
            throw new Error("AI returned an empty response");
        }

        console.log("Raw Groq response:");
        console.log(rawResult);

        // Remove markdown code fences if the model adds them
        const cleanedResult = rawResult
            .replace(/^```json\s*/i, "")
            .replace(/^```\s*/i, "")
            .replace(/\s*```$/i, "")
            .trim();

        let result;

        try {
            result = JSON.parse(cleanedResult);
        } catch (parseError) {
            console.error("Failed to parse Groq JSON:");
            console.error(cleanedResult);

            throw new Error(
                "AI returned invalid JSON. Please try uploading the resume again."
            );
        }

        // Make sure all expected fields exist
        result = {
            summary:
                typeof result.summary === "string"
                    ? result.summary
                    : "Unable to generate a resume summary.",

            strengths:
                Array.isArray(result.strengths)
                    ? result.strengths
                    : [],

            recommendedDomains:
                Array.isArray(result.recommendedDomains)
                    ? result.recommendedDomains
                    : [],

            experienceLevel:
                result.experienceLevel || "Junior",

            skillsDetected:
                Array.isArray(result.skillsDetected)
                    ? result.skillsDetected
                    : [],
        };

        console.log("Parsed resume analysis:");
        console.log(result);

        return res.status(200).json({
            success: true,
            analysis: result,
        });

    } catch (error) {
        console.error("Resume analysis error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to analyze resume",
            error: error.message,
        });
    }
}

module.exports = {
    analyzeResume,
};