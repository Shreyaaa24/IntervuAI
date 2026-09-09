"use client";

import React from "react";
import { useRouter } from "next/navigation";

const features = [
  {
    icon: "🤖",
    title: "AI-Powered Interviews",
    description:
      "Practice realistic technical interviews with an AI interviewer that asks questions based on your selected domain.",
  },
  {
    icon: "💬",
    title: "Instant AI Feedback",
    description:
      "Get immediate feedback on your answers, including technical accuracy, clarity, communication, and areas for improvement.",
  },
  {
    icon: "📊",
    title: "Performance Analysis",
    description:
      "Receive a score after your interview and understand how well you performed across your technical responses.",
  },
  {
    icon: "📄",
    title: "AI Resume Analysis",
    description:
      "Upload your resume and get AI-powered insights about your skills, experience level, strengths, and suitable career domains.",
  },
  {
    icon: "🎯",
    title: "Multiple Domains",
    description:
      "Practice across frontend, backend, Python, data science, DevOps, system design, databases, and more.",
  },
  {
    icon: "📈",
    title: "Track Your Progress",
    description:
      "Your completed interview sessions are saved so you can review your performance and track your improvement over time.",
  },
];

const FeaturesPage = () => {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-50">

      {/* Hero */}
      <section className="px-4 pb-12 pt-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">

          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 text-3xl shadow-lg">
            ✨
          </div>

          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-violet-600">
            Everything you need to prepare
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Prepare Smarter with
            <span className="block text-violet-600">
              AI-Powered Practice
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
            Mock Interview helps you practice technical interviews,
            understand your strengths, identify gaps, and become more
            confident before the real interview.
          </p>

        </div>
      </section>

      {/* Features */}
      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg"
              >

                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100 text-2xl transition group-hover:bg-violet-600">
                  {feature.icon}
                </div>

                <h2 className="text-lg font-bold text-gray-900">
                  {feature.title}
                </h2>

                <p className="mt-3 text-sm leading-6 text-gray-600">
                  {feature.description}
                </p>

              </div>
            ))}

          </div>
        </div>
      </section>

      {/* How it helps */}
      <section className="border-y border-violet-100 bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">

          <div className="grid items-center gap-10 md:grid-cols-2">

            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-violet-600">
                Built for interview preparation
              </p>

              <h2 className="mt-2 text-3xl font-bold text-gray-900">
                From preparation to confidence
              </h2>

              <p className="mt-4 leading-7 text-gray-600">
                Instead of simply reading interview questions, practice
                answering them in an interactive environment. The AI
                evaluates your responses and helps you understand where
                you can improve.
              </p>

              <button
                onClick={() => router.push("/login")}
                className="mt-6 rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-700"
              >
                Start Practicing
              </button>
            </div>

            <div className="rounded-3xl bg-gradient-to-br from-violet-600 to-indigo-600 p-8 text-white shadow-xl">

              <div className="grid gap-5 sm:grid-cols-2">

                <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-sm">
                  <p className="text-3xl font-bold">AI</p>
                  <p className="mt-1 text-sm text-violet-100">
                    Personalized questions
                  </p>
                </div>

                <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-sm">
                  <p className="text-3xl font-bold">10–100</p>
                  <p className="mt-1 text-sm text-violet-100">
                    Performance scoring
                  </p>
                </div>

                <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-sm">
                  <p className="text-3xl font-bold">8+</p>
                  <p className="mt-1 text-sm text-violet-100">
                    Technical domains
                  </p>
                </div>

                <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-sm">
                  <p className="text-3xl font-bold">24/7</p>
                  <p className="mt-1 text-sm text-violet-100">
                    Practice whenever you want
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-3xl bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-12 text-center text-white shadow-xl sm:px-12">

          <h2 className="text-3xl font-bold">
            Ready to improve your interview skills?
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-violet-100">
            Choose your domain, start an AI interview, and get feedback
            that helps you improve.
          </p>

          <button
            onClick={() => router.push("/login")}
            className="mt-7 rounded-xl bg-white px-6 py-3 font-semibold text-violet-700 transition hover:bg-violet-50"
          >
            Get Started
          </button>

        </div>
      </section>

    </main>
  );
};

export default FeaturesPage;

