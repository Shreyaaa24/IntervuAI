"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axiosInstance from "@/lib/axios";
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  Loader2,
  MessageSquare,
  Send,
  Sparkles,
  Trophy,
  X,
  ChevronRight,
} from "lucide-react";

const TOTAL_QUESTIONS = 3;

const InterviewPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const domain = searchParams.get("domain") || "General";

  const [sessionId, setSessionId] = useState<string | null>(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const [questionNumber, setQuestionNumber] = useState(1);
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState<number | null>(null);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [isComplete, setIsComplete] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const [seconds, setSeconds] = useState(0);

  // ─────────────────────────────────────────────
  // START INTERVIEW
  // ─────────────────────────────────────────────

  useEffect(() => {
    const startInterview = async () => {
      try {
        setLoading(true);

        const response = await axiosInstance.post("/api/interviews/start", {
          domain,
        });

        setSessionId(response.data.sessionId);
        setQuestion(response.data.question);
      } catch (error: any) {
        console.error("Failed to start interview:", error);

        alert(
          error?.response?.data?.message ||
            "Failed to start interview. Please try again.",
        );

        router.push("/dashboard");
      } finally {
        setLoading(false);
      }
    };

    startInterview();
  }, [domain, router]);

  // ─────────────────────────────────────────────
  // TIMER
  // ─────────────────────────────────────────────

  useEffect(() => {
    if (loading || isComplete) return;

    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [loading, isComplete]);

  // ─────────────────────────────────────────────
  // FORMAT TIMER
  // ─────────────────────────────────────────────

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;

    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  // ─────────────────────────────────────────────
  // SUBMIT ANSWER
  // ─────────────────────────────────────────────

  const handleSubmit = async () => {
    if (!answer.trim()) {
      return;
    }

    if (!sessionId) {
      alert("Interview session not found.");
      return;
    }

    try {
      setSubmitting(true);

      const response = await axiosInstance.post(
        "/api/interviews/submit-answer",
        {
          sessionId,
          answer: answer.trim(),
          domain,
          questionsAnswered: questionNumber - 1,
        },
      );

      setFeedback(response.data.feedback || "");
      setShowFeedback(true);

      // ───────────────────────────────────────
      // INTERVIEW COMPLETE
      // ───────────────────────────────────────

      if (response.data.isComplete) {
        setScore(response.data.score);
        setIsComplete(true);
        return;
      }

      // ───────────────────────────────────────
      // NEXT QUESTION
      // ───────────────────────────────────────

      setQuestion(response.data.nextQuestion);
      setQuestionNumber((prev) => prev + 1);
      setAnswer("");
    } catch (error: any) {
      console.error("Failed to submit answer:", error);

      alert(
        error?.response?.data?.message ||
          "Failed to submit your answer. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  // ─────────────────────────────────────────────
  // END INTERVIEW
  // ─────────────────────────────────────────────

  const handleEndInterview = () => {
    const confirmed = window.confirm(
      "Are you sure you want to end this interview? Your current progress may not be saved.",
    );

    if (confirmed) {
      router.push("/dashboard");
    }
  };

  // ─────────────────────────────────────────────
  // NEXT QUESTION AFTER FEEDBACK
  // ─────────────────────────────────────────────

  const handleContinue = () => {
    setShowFeedback(false);
  };

  // ─────────────────────────────────────────────
  // LOADING SCREEN
  // ─────────────────────────────────────────────

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-50 flex items-center justify-center px-4">
        <div className="w-full max-w-md rounded-3xl bg-white border border-violet-100 shadow-xl p-8 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100">
            <Sparkles className="h-8 w-8 text-violet-600 animate-pulse" />
          </div>

          <h1 className="text-2xl font-bold text-gray-900">
            Preparing your interview
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Our AI interviewer is preparing your first {domain} question...
          </p>

          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-violet-600">
            <Loader2 className="h-4 w-4 animate-spin" />
            Starting interview...
          </div>
        </div>
      </main>
    );
  }

  // ─────────────────────────────────────────────
  // COMPLETION SCREEN
  // ─────────────────────────────────────────────

  if (isComplete) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-50 px-4 py-8">
        <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-3xl items-center justify-center">
          <div className="w-full rounded-3xl border border-violet-100 bg-white p-8 shadow-xl sm:p-12">
            <div className="text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-violet-100">
                <Trophy className="h-10 w-10 text-violet-600" />
              </div>

              <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-violet-600">
                Interview Completed
              </p>

              <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
                Great job! 🎉
              </h1>

              <p className="mx-auto mt-3 max-w-lg text-gray-500">
                You have completed your {domain} mock interview. Here is your
                overall performance score.
              </p>

              {/* Score */}
              <div className="mx-auto mt-8 flex h-40 w-40 flex-col items-center justify-center rounded-full border-8 border-violet-100 bg-violet-50">
                <span className="text-5xl font-bold text-violet-700">
                  {score ?? "--"}
                </span>

                <span className="mt-1 text-sm font-medium text-gray-500">
                  out of 100
                </span>
              </div>

              {/* Feedback */}
              {feedback && (
                <div className="mt-8 rounded-2xl border border-violet-100 bg-violet-50/60 p-5 text-left">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-violet-600" />

                    <h2 className="font-semibold text-gray-900">
                      Final Feedback
                    </h2>
                  </div>

                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    {feedback}
                  </p>
                </div>
              )}

              {/* Stats */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                  <p className="text-2xl font-bold text-gray-900">3</p>
                  <p className="mt-1 text-xs text-gray-500">
                    Questions Answered
                  </p>
                </div>

                <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                  <p className="text-2xl font-bold text-gray-900">
                    {formatTime(seconds)}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">Time Taken</p>
                </div>
              </div>

              <button
                onClick={() => router.push("/dashboard")}
                className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3.5 font-semibold text-white transition hover:bg-violet-700 sm:w-auto"
              >
                Back to Dashboard
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // ─────────────────────────────────────────────
  // MAIN INTERVIEW SCREEN
  // ─────────────────────────────────────────────

  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-50">
      {/* Header */}
      <header className="border-b border-violet-100 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          {/* Back */}
          <button
            onClick={handleEndInterview}
            className="flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-violet-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Exit Interview
          </button>

          {/* Domain */}
          <div className="hidden items-center gap-2 rounded-full bg-violet-50 px-4 py-2 sm:flex">
            <Sparkles className="h-4 w-4 text-violet-600" />

            <span className="text-sm font-semibold text-violet-700">
              {domain}
            </span>
          </div>

          {/* Timer */}
          <div className="flex items-center gap-2 rounded-full border border-violet-100 bg-white px-4 py-2 shadow-sm">
            <Clock3 className="h-4 w-4 text-violet-600" />

            <span className="font-mono text-sm font-semibold text-gray-700">
              {formatTime(seconds)}
            </span>
          </div>
        </div>
      </header>

      {/* Main */}
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Progress */}
        <div className="mb-6 rounded-2xl border border-violet-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-900">
                Question {questionNumber} of {TOTAL_QUESTIONS}
              </p>

              <p className="mt-1 text-xs text-gray-500">
                Take your time and explain your answer clearly.
              </p>
            </div>

            <span className="text-sm font-semibold text-violet-600">
              {Math.round((questionNumber / TOTAL_QUESTIONS) * 100)}%
            </span>
          </div>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-violet-100">
            <div
              className="h-full rounded-full bg-violet-600 transition-all duration-500"
              style={{
                width: `${(questionNumber / TOTAL_QUESTIONS) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* AI Question Card */}
        <div className="rounded-3xl border border-violet-100 bg-white shadow-xl">
          <div className="border-b border-gray-100 p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 shadow-md">
                <Sparkles className="h-6 w-6 text-white" />
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-semibold text-violet-600">
                    AI Interviewer
                  </span>

                  <span className="rounded-full bg-violet-50 px-2.5 py-1 text-xs font-medium text-violet-600">
                    Technical
                  </span>
                </div>

                <p className="mt-3 text-lg font-semibold leading-8 text-gray-900 sm:text-xl">
                  {question}
                </p>
              </div>
            </div>
          </div>

          {/* Answer Area */}
          <div className="p-6 sm:p-8">
            <label
              htmlFor="answer"
              className="mb-3 block text-sm font-semibold text-gray-900"
            >
              Your Answer
            </label>

            <textarea
              id="answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Type your answer here..."
              disabled={submitting}
              className="min-h-[240px] w-full resize-none rounded-2xl border border-gray-200 bg-gray-50 p-5 text-sm leading-7 text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100 disabled:cursor-not-allowed disabled:opacity-60"
            />

            <div className="mt-3 flex items-center justify-between">
              <p className="text-xs text-gray-400">
                Tip: Explain your reasoning and give examples where possible.
              </p>

              <span className="text-xs text-gray-400">
                {answer.length} characters
              </span>
            </div>

            {/* Submit */}
            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                onClick={handleEndInterview}
                disabled={submitting}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <X className="h-4 w-4" />
                End Interview
              </button>

              <button
                onClick={handleSubmit}
                disabled={submitting || !answer.trim()}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-7 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Evaluating...
                  </>
                ) : (
                  <>
                    Submit Answer
                    <Send className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Feedback */}
        {showFeedback && feedback && (
          <div className="mt-6 rounded-3xl border border-violet-100 bg-white p-6 shadow-lg sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-100">
                <CheckCircle2 className="h-6 w-6 text-violet-600" />
              </div>

              <div className="flex-1">
                <h2 className="font-bold text-gray-900">
                  AI Feedback
                </h2>

                <p className="mt-2 text-sm leading-7 text-gray-600">
                  {feedback}
                </p>
              </div>
            </div>

            {!isComplete && (
              <button
                onClick={handleContinue}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-700"
              >
                Continue to Next Question
                <ChevronRight className="h-4 w-4" />
              </button>
            )}
          </div>
        )}

        {/* Bottom Info */}
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400">
          <Sparkles className="h-3.5 w-3.5 text-violet-400" />
          Powered by AI • Your responses are evaluated in real time
        </div>
      </div>
    </main>
  );
};

export default InterviewPage;