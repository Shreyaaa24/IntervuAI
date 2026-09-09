"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp?: string;
}

interface Interview {
  _id: string;
  domain: string;
  score: number;
  duration: number;
  feedback: string;
  createdAt: string;
  messages: Message[];
}

const Page = () => {
  const { id } = useParams();
  const router = useRouter();

  const [interview, setInterview] = useState<Interview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchInterview = async () => {
      try {
        setLoading(true);

        const { data } = await axiosInstance.get(`/api/interviews/${id}`);

        setInterview(data.interview);
      } catch (err: any) {
        console.error(err);

        setError(
          err.response?.data?.message || "Unable to load interview session."
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchInterview();
  }, [id]);

  const getScoreColor = (score: number) => {
    if (score >= 80)
      return "bg-green-100 text-green-700 border-green-200";
    if (score >= 60)
      return "bg-yellow-100 text-yellow-700 border-yellow-200";
    return "bg-red-100 text-red-700 border-red-200";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-violet-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-violet-300 border-t-violet-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-violet-700 font-medium">
            Loading interview session...
          </p>
        </div>
      </div>
    );
  }

  if (error || !interview) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-violet-50 px-4">
        <div className="bg-white rounded-3xl shadow-lg border border-violet-200 p-8 max-w-md text-center">
          <div className="text-5xl mb-4">⚠️</div>

          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Session Not Found
          </h2>

          <p className="text-gray-500 mb-6">{error}</p>

          <button
            onClick={() => router.push("/history")}
            className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-xl font-semibold transition"
          >
            Back to My Sessions
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-50">
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">

        {/* Back Button */}
        <button
          onClick={() => router.push("/history")}
          className="flex items-center gap-2 text-violet-700 hover:text-violet-900 font-medium"
        >
          ← Back to My Sessions
        </button>

        {/* Header */}
        <div className="bg-white rounded-3xl border border-violet-200 shadow-md p-8">
          <div className="flex flex-col md:flex-row md:justify-between gap-6">

            <div>
              <p className="text-violet-600 text-sm font-semibold uppercase">
                Interview Session
              </p>

              <h1 className="text-3xl font-bold text-gray-900 mt-2">
                {interview.domain}
              </h1>

              <p className="text-gray-500 mt-2">
                {new Date(interview.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>

            <div
              className={`px-6 py-4 rounded-2xl border text-center ${getScoreColor(
                interview.score
              )}`}
            >
              <p className="text-xs uppercase font-semibold">Final Score</p>

              <h2 className="text-4xl font-bold mt-1">{interview.score}</h2>

              <p className="text-sm">/100</p>
            </div>

          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">

            <div className="bg-violet-50 rounded-xl p-4 border border-violet-100 text-center">
              <p className="text-xs text-gray-500">Duration</p>

              <p className="font-bold text-violet-700 text-lg mt-1">
                {interview.duration} min
              </p>
            </div>

            <div className="bg-violet-50 rounded-xl p-4 border border-violet-100 text-center">
              <p className="text-xs text-gray-500">Questions</p>

              <p className="font-bold text-violet-700 text-lg mt-1">
                {
                  interview.messages.filter((m) => m.role === "assistant").length
                }
              </p>
            </div>

            <div className="bg-violet-50 rounded-xl p-4 border border-violet-100 text-center">
              <p className="text-xs text-gray-500">Answers</p>

              <p className="font-bold text-violet-700 text-lg mt-1">
                {interview.messages.filter((m) => m.role === "user").length}
              </p>
            </div>

            <div className="bg-violet-50 rounded-xl p-4 border border-violet-100 text-center">
              <p className="text-xs text-gray-500">Domain</p>

              <p className="font-bold text-violet-700 text-sm mt-2">
                {interview.domain}
              </p>
            </div>

          </div>
        </div>

        {/* AI Feedback */}
        <div className="bg-white rounded-3xl border border-violet-200 shadow-md p-8">
          <h2 className="text-xl font-bold text-violet-700 mb-4 flex items-center gap-2">
            🤖 AI Overall Feedback
          </h2>

          <div className="bg-violet-50 border border-violet-200 rounded-2xl p-5">
            <p className="text-gray-700 leading-7 whitespace-pre-wrap">
              {interview.feedback || "No overall feedback available."}
            </p>
          </div>
        </div>

        {/* Conversation */}
        <div className="bg-white rounded-3xl border border-violet-200 shadow-md p-8">
          <h2 className="text-xl font-bold text-violet-700 mb-6">
            💬 Interview Conversation
          </h2>

          <div className="space-y-5">
            {interview.messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-5 py-4 shadow-sm ${
                    message.role === "assistant"
                      ? "bg-violet-100 border border-violet-200"
                      : "bg-gradient-to-r from-violet-600 to-indigo-600 text-white"
                  }`}
                >
                  <p
                    className={`text-xs font-semibold mb-2 ${
                      message.role === "assistant"
                        ? "text-violet-700"
                        : "text-violet-100"
                    }`}
                  >
                    {message.role === "assistant"
                      ? "🤖 AI Interviewer"
                      : "🙋 Your Answer"}
                  </p>

                  <p className="leading-7 whitespace-pre-wrap">
                    {message.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid sm:grid-cols-2 gap-4 pb-8">
          <button
            onClick={() =>
              router.push(
                `/interview?domain=${encodeURIComponent(interview.domain)}`
              )
            }
            className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:opacity-90 text-white py-4 rounded-2xl font-semibold transition shadow-md"
          >
            🔄 Practice Again
          </button>

          <button
            onClick={() => router.push("/dashboard")}
            className="border border-violet-300 text-violet-700 hover:bg-violet-100 py-4 rounded-2xl font-semibold transition"
          >
            📊 Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;