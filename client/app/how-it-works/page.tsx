"use client";

import React from "react";
import { useRouter } from "next/navigation";

const steps = [
  {
    number: "01",
    title: "Create Your Account",
    icon: "👤",
    description:
      "Sign up or log in to access AI Mock Interview, save interview history, and analyze your resume.",
  },
  {
    number: "02",
    title: "Choose an Interview Domain",
    icon: "🌐",
    description:
      "Pick a domain like React, JavaScript, Python, System Design, DevOps, Data Science, Database Design, or General.",
  },
  {
    number: "03",
    title: "Answer AI Interview Questions",
    icon: "🎤",
    description:
      "The AI interviewer asks one technical question at a time. Answer naturally, just like a real interview.",
  },
  {
    number: "04",
    title: "Receive Instant AI Feedback",
    icon: "💬",
    description:
      "After every answer, AI evaluates your technical accuracy, clarity, communication, and suggests improvements.",
  },
  {
    number: "05",
    title: "Complete the Interview",
    icon: "🏁",
    description:
      "Finish the interview and receive an overall performance score out of 100 with personalized feedback.",
  },
  {
    number: "06",
    title: "Track Your Progress",
    icon: "📈",
    description:
      "All completed interviews are saved in My Sessions so you can review your improvement over time.",
  },
];

const faqs = [
  {
    question: "How many questions does an interview contain?",
    answer:
      "Each mock interview currently contains 3 AI-generated technical questions followed by feedback and a final score.",
  },
  {
    question: "Can I practice different domains?",
    answer:
      "Yes. You can practice React, JavaScript, Python, Data Science, DevOps, System Design, Database Design, and General interviews.",
  },
  {
    question: "Will my interview history be saved?",
    answer:
      "Yes. Every completed interview is stored in your account and appears in the My Sessions page.",
  },
  {
    question: "Can AI analyze my resume too?",
    answer:
      "Yes. Upload your resume from the Dashboard to receive AI-generated strengths, detected skills, experience level, and recommended interview domains.",
  },
];

const HowItWorksPage = () => {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-50">
      {/* Hero */}
      <section className="px-4 pt-16 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 text-3xl text-white shadow-lg">
            ❓
          </div>

          <p className="text-sm font-semibold uppercase tracking-wider text-violet-600">
            AI Mock Interview Guide
          </p>

          <h1 className="mt-3 text-4xl font-bold text-gray-900 sm:text-5xl">
            How AI Mock Interview Works
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
            Practice technical interviews in a few simple steps and receive
            personalized AI feedback to improve your interview performance.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-8">
          {steps.map((step, index) => (
            <div key={step.number} className="flex gap-5 items-start">
              {/* Left Timeline */}
              <div className="flex flex-col items-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 text-white text-xl shadow-md">
                  {step.icon}
                </div>

                {index !== steps.length - 1 && (
                  <div className="mt-2 h-16 w-1 rounded-full bg-violet-200" />
                )}
              </div>

              {/* Card */}
              <div className="flex-1 rounded-2xl border border-violet-100 bg-white p-6 shadow-sm hover:border-violet-300 hover:shadow-md transition-all">
                <span className="text-xs font-bold tracking-widest text-violet-600">
                  STEP {step.number}
                </span>

                <h2 className="mt-2 text-xl font-bold text-gray-900">
                  {step.title}
                </h2>

                <p className="mt-3 text-gray-600 leading-7">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Flow Summary */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl rounded-3xl bg-gradient-to-r from-violet-600 to-indigo-600 p-8 text-white shadow-xl">
          <h2 className="text-center text-3xl font-bold mb-10">
            Your Interview Journey
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: "📝",
                title: "Login",
                text: "Sign in to access interviews and resume analysis.",
              },
              {
                icon: "🎯",
                title: "Choose Domain",
                text: "Select the interview topic you want to practice.",
              },
              {
                icon: "🤖",
                title: "AI Interview",
                text: "Answer technical questions generated by AI.",
              },
              {
                icon: "💬",
                title: "Feedback",
                text: "Get detailed AI feedback after every answer.",
              },
              {
                icon: "🏆",
                title: "Score",
                text: "Receive your final interview score and evaluation.",
              },
              {
                icon: "📈",
                title: "Progress",
                text: "Track completed interviews from My Sessions.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl bg-white/10 p-5 backdrop-blur-sm"
              >
                <div className="text-3xl mb-3">{item.icon}</div>

                <h3 className="font-semibold text-lg">{item.title}</h3>

                <p className="mt-2 text-sm text-violet-100 leading-6">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Use This Platform */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold uppercase tracking-wider text-violet-600">
              Why choose AI Mock Interview?
            </p>

            <h2 className="mt-2 text-3xl font-bold text-gray-900">
              Everything Designed for Placement Preparation
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: "⚡",
                title: "Realistic Questions",
              },
              {
                icon: "🎤",
                title: "Interactive Interview Experience",
              },
              {
                icon: "📄",
                title: "Resume-Based Recommendations",
              },
              {
                icon: "📊",
                title: "Performance Tracking",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-violet-100 bg-white p-6 text-center shadow-sm hover:border-violet-300 hover:shadow-md transition-all"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100 text-2xl">
                  {item.icon}
                </div>

                <h3 className="font-semibold text-gray-900">
                  {item.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 bg-white border-y border-violet-100">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold uppercase tracking-wider text-violet-600">
              Frequently Asked Questions
            </p>

            <h2 className="mt-2 text-3xl font-bold text-gray-900">
              Got Questions?
            </h2>
          </div>

          <div className="space-y-5">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-2xl border border-violet-100 bg-violet-50/50 p-6"
              >
                <h3 className="font-semibold text-gray-900 text-lg">
                  {faq.question}
                </h3>

                <p className="mt-3 text-gray-600 leading-7">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-3xl bg-gradient-to-r from-violet-600 to-indigo-600 px-8 py-12 text-center text-white shadow-xl">
          <h2 className="text-3xl font-bold">
            Ready to Ace Your Next Interview?
          </h2>

          <p className="mt-4 text-violet-100 max-w-xl mx-auto leading-7">
            Practice AI-powered technical interviews, receive personalized
            feedback, analyze your resume, and improve your confidence before
            your placement interviews.
          </p>

          <button
            onClick={() => router.push("/login")}
            className="mt-8 rounded-xl bg-white px-6 py-3 font-semibold text-violet-700 hover:bg-violet-50 transition"
          >
            Start Practicing Now
          </button>
        </div>
      </section>
    </main>
  );
};

export default HowItWorksPage;
