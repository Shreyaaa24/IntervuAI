"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Page = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Login Success:", response.data);

      // Save JWT token
      localStorage.setItem("token", response.data.token);

      // Save user information
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      // Tell Navbar that login has happened
      window.dispatchEvent(new Event("authChange"));

      // Redirect to dashboard
      router.push("/dashboard");

    } catch (err: any) {
      console.error("Login Error:", err);

      setError(
        err.response?.data?.message ||
          "Invalid email or password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-100 via-violet-200 to-indigo-100 px-4 py-8">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="w-14 h-14 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">
              AI
            </span>
          </div>
        </div>

        <Card className="p-8 rounded-3xl border border-violet-200 shadow-xl bg-white">

          {/* Heading */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome Back
            </h1>

            <p className="text-gray-500 mt-2">
              Sign in to continue your AI Mock Interview practice.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>

              <input
                type="email"
                id="email"
                name="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-violet-200 px-4 py-3 outline-none transition-all focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-2">

                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  Password
                </label>

                <Link
                  href="/forgot-password"
                  className="text-sm text-violet-600 hover:text-violet-700 hover:underline"
                >
                  Forgot Password?
                </Link>

              </div>

              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-violet-200 px-4 py-3 outline-none transition-all focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
              />
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-violet-600 py-3 text-white hover:bg-violet-700 transition-colors"
            >
              {loading ? "Logging in..." : "Login"}
            </Button>

          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />

            <span className="text-xs text-gray-400">
              OR
            </span>

            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* Create Account */}
          <div className="text-center text-sm">
            <span className="text-gray-600">
              Don't have an account?{" "}
            </span>

            <Link
              href="/register"
              className="font-semibold text-violet-600 hover:text-violet-700 hover:underline"
            >
              Create one
            </Link>
          </div>

        </Card>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-gray-500">
          Protected by enterprise-grade security.
        </p>

      </div>
    </div>
  );
};

export default Page;

