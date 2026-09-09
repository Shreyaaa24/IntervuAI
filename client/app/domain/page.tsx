"use client";

import React from "react";
import { useRouter } from "next/navigation";

const domains = [
  {
    name: "JavaScript / Node.js",
    icon: "⚡",
    description:
      "Practice JavaScript fundamentals, asynchronous programming, Node.js, APIs, and backend concepts.",
    topics: ["JavaScript", "Node.js", "APIs", "Async Programming"],
  },
  {
    name: "React",
    icon: "⚛️",
    description:
      "Test your understanding of React components, hooks, state management, performance, and modern frontend development.",
    topics: ["React", "Hooks", "State", "Components"],
  },
  {
    name: "Python",
    icon: "🐍",
    description:
      "Prepare for Python interviews covering programming fundamentals, OOP, data structures, and problem solving.",
    topics: ["Python", "OOP", "DSA", "Problem Solving"],
  },
  {
    name: "Data Science",
    icon: "📊",
    description:
      "Practice questions covering statistics, data analysis, machine learning, and data science concepts.",
    topics: ["Statistics", "Pandas", "ML", "Data Analysis"],
  },
  {
    name: "DevOps",
    icon: "☁️",
    description:
      "Prepare for DevOps interviews covering deployment, CI/CD, containers, cloud, and infrastructure concepts.",
    topics: ["Docker", "CI/CD", "Cloud", "Deployment"],
  },
  {
    name: "System Design",
    icon: "🏗️",
    description:
      "Practice designing scalable systems and discuss architecture, APIs, databases, caching, and reliability.",
    topics: ["Architecture", "Scalability", "Caching", "APIs"],
  },
  {
    name: "Database Design",
    icon: "🗄️",
    description:
      "Test your knowledge of SQL, database design, normalization, indexing, transactions, and optimization.",
    topics: ["SQL", "MongoDB", "Normalization", "Indexing"],
  },
  {
    name: "General",
    icon: "🎯",
    description:
      "A mixed technical interview covering multiple software development and computer science topics.",
    topics: ["Programming", "CS Fundamentals", "Web", "Software"],
  },
];

const DomainPage = () => {
  const router = useRouter();

  const handleStart = (domain: string) => {
    router.push(
      `/login?redirect=${encodeURIComponent(
        `/interview?domain=${domain}`
      )}`
    );
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-50">

      {/* Hero */}
      <section className="px-4 pb-10 pt-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">

          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 text-3xl shadow-lg">
            🌐
          </div>

          <p className="text-sm font-semibold uppercase tracking-wider text-violet-600">
            Choose your path
          </p>

          <h1 className="mt-2 text-4xl font-bold text-gray-900 sm:text-5xl">
            Explore Interview Domains
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
            Select a technical domain that matches your career goals and
            practice with an AI-powered interviewer.
          </p>

        </div>
      </section>

      {/* Domains */}
      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

            {domains.map((domain) => (
              <div
                key={domain.name}
                className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-300 hover:shadow-lg"
              >

                {/* Icon */}
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-3xl">
                  {domain.icon}
                </div>

                {/* Title */}
                <h2 className="text-lg font-bold text-gray-900">
                  {domain.name}
                </h2>

                {/* Description */}
                <p className="mt-3 flex-1 text-sm leading-6 text-gray-600">
                  {domain.description}
                </p>

                {/* Topics */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {domain.topics.map((topic) => (
                    <span
                      key={topic}
                      className="rounded-full bg-violet-50 px-2.5 py-1 text-xs font-medium text-violet-700"
                    >
                      {topic}
                    </span>
                  ))}
                </div>

                {/* Button */}
                <button
                  onClick={() => handleStart(domain.name)}
                  className="mt-6 w-full rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700"
                >
                  Practice This Domain
                </button>

              </div>
            ))}

          </div>

        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-violet-100 bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">

          <h2 className="text-2xl font-bold text-gray-900">
            Not sure which domain to choose?
          </h2>

          <p className="mt-3 text-gray-600">
            Upload your resume from the dashboard and let AI analyze your
            skills and recommend suitable interview domains.
          </p>

          <button
            onClick={() => router.push("/login")}
            className="mt-6 rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-700"
          >
            Analyze My Resume
          </button>

        </div>
      </section>

    </main>
  );
};

export default DomainPage;

