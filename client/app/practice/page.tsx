"use client";

import React from "react";
import { useRouter } from "next/navigation";

const domains = [
  {
    name: "JavaScript / Node.js",
    description: "Practice JavaScript concepts, Node.js and backend development.",
    icon: "⚡",
    color: "from-yellow-400 to-orange-500",
  },
  {
    name: "React",
    description: "Test your React knowledge, hooks, components and state management.",
    icon: "⚛️",
    color: "from-cyan-400 to-blue-500",
  },
  {
    name: "Python",
    description: "Practice Python fundamentals, programming and problem solving.",
    icon: "🐍",
    color: "from-blue-400 to-indigo-500",
  },
  {
    name: "Data Science",
    description: "Practice data analysis, statistics, machine learning and Python.",
    icon: "📊",
    color: "from-green-400 to-emerald-500",
  },
  {
    name: "DevOps",
    description: "Practice CI/CD, Docker, cloud, deployment and DevOps concepts.",
    icon: "☁️",
    color: "from-sky-400 to-blue-600",
  },
  {
    name: "System Design",
    description: "Practice architecture, scalability, databases and system design.",
    icon: "🏗️",
    color: "from-violet-400 to-purple-600",
  },
  {
    name: "Database Design",
    description: "Practice SQL, database concepts, normalization and optimization.",
    icon: "🗄️",
    color: "from-pink-400 to-rose-500",
  },
  {
    name: "General",
    description: "A mixed technical interview covering multiple development topics.",
    icon: "🎯",
    color: "from-violet-500 to-indigo-600",
  },
];

const PracticePage = () => {
  const router = useRouter();

  const startInterview = (domain: string) => {
    router.push(`/interview?domain=${encodeURIComponent(domain)}`);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-50">

      {/* Hero Section */}
      <section className="px-4 pt-12 pb-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">

          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 text-2xl shadow-lg">
            🎤
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Practice Your Interview
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-gray-600">
            Choose a domain and practice with an AI interviewer.
            Get instant feedback and improve your interview skills.
          </p>
        </div>
      </section>

      {/* Domain Cards */}
      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">

          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              Choose your domain
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Select the area you want to practice.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {domains.map((domain) => (
              <div
                key={domain.name}
                className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-300 hover:shadow-lg"
              >

                {/* Icon */}
                <div
                  className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${domain.color} text-2xl shadow-sm`}
                >
                  {domain.icon}
                </div>

                {/* Domain */}
                <h3 className="text-lg font-semibold text-gray-900">
                  {domain.name}
                </h3>

                {/* Description */}
                <p className="mt-2 min-h-[60px] text-sm leading-5 text-gray-500">
                  {domain.description}
                </p>

                {/* Start Button */}
                <button
                  onClick={() => startInterview(domain.name)}
                  className="mt-5 w-full rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700 active:scale-[0.98]"
                >
                  Start Practice
                </button>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* Bottom Info */}
      <section className="border-t border-violet-100 bg-white/70 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-3">

          <div className="text-center">
            <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-violet-100 text-xl">
              🤖
            </div>

            <h3 className="font-semibold text-gray-900">
              AI-Powered Questions
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Questions are generated according to your selected domain.
            </p>
          </div>

          <div className="text-center">
            <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-indigo-100 text-xl">
              💬
            </div>

            <h3 className="font-semibold text-gray-900">
              Instant Feedback
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Receive AI feedback after answering each question.
            </p>
          </div>

          <div className="text-center">
            <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-purple-100 text-xl">
              📈
            </div>

            <h3 className="font-semibold text-gray-900">
              Track Progress
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Your completed interviews are saved to your sessions.
            </p>
          </div>

        </div>
      </section>

    </main>
  );
};

export default PracticePage;

