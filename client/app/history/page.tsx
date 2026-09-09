"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";

interface Interview {
    id: string;
    topic: string;
    score: number;
    duration: number;
    date: string;
}

const HistoryPage = () => {
    const router = useRouter();

    const [interviews, setInterviews] = useState<Interview[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchInterviews = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await axiosInstance.get("/api/interviews");

                setInterviews(response.data?.interviews || []);
            } catch (err: any) {
                console.error("Failed to fetch interviews:", err);

                if (err.response?.status === 401) {
                    setError("Your session has expired. Please login again.");
                } else {
                    setError(
                        err.response?.data?.message ||
                        "Unable to load your interview sessions."
                    );
                }
            } finally {
                setLoading(false);
            }
        };

        fetchInterviews();
    }, []);

    const formatDate = (date: string) => {
        if (!date) return "Unknown date";

        return new Date(date).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };

    const getScoreColor = (score: number) => {
        if (score >= 80) {
            return "text-green-600 bg-green-50 border-green-200";
        }

        if (score >= 60) {
            return "text-yellow-600 bg-yellow-50 border-yellow-200";
        }

        return "text-red-600 bg-red-50 border-red-200";
    };

    const getScoreLabel = (score: number) => {
        if (score >= 80) return "Excellent";
        if (score >= 60) return "Good";
        return "Needs Improvement";
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-50">

            {/* Header */}
            <section className="px-4 pt-12 pb-8 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

                        <div>
                            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 text-2xl shadow-md">
                                📜
                            </div>

                            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                                My Sessions
                            </h1>

                            <p className="mt-2 text-gray-600">
                                Review your previous AI interview sessions and track your
                                progress.
                            </p>
                        </div>

                        <button
                            onClick={() => router.push("/practice")}
                            className="rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700"
                        >
                            + New Practice
                        </button>

                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="px-4 pb-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">

                    {/* Loading */}
                    {loading && (
                        <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center shadow-sm">
                            <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-violet-200 border-t-violet-600" />

                            <p className="font-medium text-gray-700">
                                Loading your sessions...
                            </p>

                            <p className="mt-1 text-sm text-gray-500">
                                Please wait while we fetch your interview history.
                            </p>
                        </div>
                    )}

                    {/* Error */}
                    {!loading && error && (
                        <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">

                            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-xl">
                                ⚠️
                            </div>

                            <h2 className="text-lg font-semibold text-red-800">
                                Something went wrong
                            </h2>

                            <p className="mx-auto mt-2 max-w-md text-sm text-red-600">
                                {error}
                            </p>

                            <button
                                onClick={() => window.location.reload()}
                                className="mt-5 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
                            >
                                Try Again
                            </button>

                        </div>
                    )}

                    {/* Empty State */}
                    {!loading && !error && interviews.length === 0 && (
                        <div className="rounded-2xl border border-violet-100 bg-white p-12 text-center shadow-sm">

                            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100 text-3xl">
                                🎤
                            </div>

                            <h2 className="text-xl font-bold text-gray-900">
                                No interview sessions yet
                            </h2>

                            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                                You haven't completed any AI interviews yet. Start your first
                                practice session and your results will appear here.
                            </p>

                            <button
                                onClick={() => router.push("/practice")}
                                className="mt-6 rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-700"
                            >
                                Start Your First Interview
                            </button>

                        </div>
                    )}

                    {/* Sessions */}
                    {!loading && !error && interviews.length > 0 && (
                        <div className="space-y-5">

                            {/* Summary */}
                            <div className="grid gap-4 sm:grid-cols-3">

                                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                                    <p className="text-sm text-gray-500">
                                        Total Sessions
                                    </p>

                                    <p className="mt-1 text-2xl font-bold text-gray-900">
                                        {interviews.length}
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                                    <p className="text-sm text-gray-500">
                                        Average Score
                                    </p>

                                    <p className="mt-1 text-2xl font-bold text-violet-600">
                                        {Math.round(
                                            interviews.reduce(
                                                (total, interview) => total + interview.score,
                                                0
                                            ) / interviews.length
                                        )}
                                        %
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                                    <p className="text-sm text-gray-500">
                                        Best Score
                                    </p>

                                    <p className="mt-1 text-2xl font-bold text-green-600">
                                        {Math.max(
                                            ...interviews.map((interview) => interview.score)
                                        )}
                                        %
                                    </p>
                                </div>

                            </div>

                            {/* Session Cards */}
                            <div className="grid gap-5 lg:grid-cols-2">

                                {interviews.map((interview) => (
                                    <div
                                        key={interview.id}
                                        className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-md"
                                    >

                                        {/* Top */}
                                        <div className="flex items-start justify-between gap-4">

                                            <div className="flex items-center gap-3">

                                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-xl">
                                                    💻
                                                </div>

                                                <div>
                                                    <h2 className="font-semibold text-gray-900">
                                                        {interview.topic}
                                                    </h2>

                                                    <p className="mt-0.5 text-xs text-gray-500">
                                                        {formatDate(interview.date)}
                                                    </p>
                                                </div>

                                            </div>

                                            <div
                                                className={`rounded-lg border px-3 py-1.5 text-center ${getScoreColor(
                                                    interview.score
                                                )}`}
                                            >
                                                <p className="text-lg font-bold leading-none">
                                                    {interview.score}
                                                </p>

                                                <p className="mt-1 text-[10px] font-medium">
                                                    / 100
                                                </p>
                                            </div>

                                        </div>

                                        {/* Details */}
                                        <div className="mt-5 grid grid-cols-2 gap-3">

                                            <div className="rounded-xl bg-gray-50 p-3">
                                                <p className="text-xs text-gray-500">
                                                    Duration
                                                </p>

                                                <p className="mt-1 font-semibold text-gray-800">
                                                    {interview.duration || 1} min
                                                </p>
                                            </div>

                                            <div className="rounded-xl bg-gray-50 p-3">
                                                <p className="text-xs text-gray-500">
                                                    Performance
                                                </p>

                                                <p className="mt-1 font-semibold text-gray-800">
                                                    {getScoreLabel(interview.score)}
                                                </p>
                                            </div>

                                        </div>

                                        {/* Bottom */}
                                        <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">

                                            <span className="text-sm text-gray-500">
                                                Completed
                                            </span>

                                            <button
                                                onClick={() =>
                                                    router.push(`/interview?domain=${encodeURIComponent(interview.topic)}`)
                                                }
                                                className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-700"
                                            >
                                                Practice Again
                                            </button>

                                        </div>

                                    </div>
                                ))}

                            </div>

                        </div>
                    )}

                </div>
            </section>
        </main>
    );
};

export default HistoryPage;

