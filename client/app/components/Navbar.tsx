"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
}

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check logged-in user
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (token && storedUser) {
        try {
          setUser(JSON.parse(storedUser));
          setIsLoggedIn(true);
        } catch (error) {
          console.error("Failed to parse user:", error);
          setUser(null);
          setIsLoggedIn(false);
        }
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
    };

    checkAuth();

    // Listen for login/logout changes
    window.addEventListener("authChange", checkAuth);

    return () => {
      window.removeEventListener("authChange", checkAuth);
    };
  }, []);

  // Scroll effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const isActive = (path: string) => pathname === path;

  const navLinks = isLoggedIn
    ? [
        { href: "/dashboard", label: "Dashboard", icon: "📅" },
        { href: "/practice", label: "Practice", icon: "✏️" },
        { href: "/history", label: "My Sessions", icon: "📜" },
      ]
    : [
        { href: "/features", label: "Features", icon: "✨" },
        { href: "/how-it-works", label: "How it works", icon: "❓" },
        { href: "/domain", label: "Domain", icon: "🌐" },
      ];

  const firstName = user?.name?.split(" ")[0] || "";
  const initial = firstName.charAt(0).toUpperCase();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setIsLoggedIn(false);

    // Tell other components that auth state changed
    window.dispatchEvent(new Event("authChange"));

    router.push("/");
  };

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm"
          : "bg-white border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* ---------- Logo ---------- */}
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-md">
              <span className="text-white font-bold">IA</span>
            </div>

            <div className="leading-tight">
              <h1 className="font-bold text-lg">IntervuAI</h1>
              <p className="text-xs text-violet-600 tracking-wide uppercase">
                AI Powered Technical Mock Interviews
              </p>
            </div>
          </Link>

          {/* ---------- Desktop Nav ---------- */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition ${
                  isActive(link.href)
                    ? "bg-violet-100 text-violet-700 font-semibold"
                    : "text-gray-700 hover:bg-gray-100 hover:text-violet-700"
                }`}
              >
                <span>{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            ))}
          </div>

          {/* ---------- Right Side ---------- */}
          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <>
                {/* Profile Pill */}
                <div className="flex items-center gap-3 bg-violet-100 rounded-full px-3 py-2 border border-violet-200">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md">
                    {initial}
                  </div>

                  <div className="leading-tight">
                    <p className="text-xs text-gray-500">Hi,</p>
                    <p className="font-semibold text-violet-700">
                      {firstName}
                    </p>
                  </div>
                </div>

                {/* Logout */}
                <button
                  onClick={logout}
                  className="px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-100 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-100 transition"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="px-4 py-2 rounded-full bg-violet-600 text-white hover:bg-violet-700 transition"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* ---------- Mobile Hamburger ---------- */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            ☰
          </button>
        </div>

        {/* ---------- Mobile Menu ---------- */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 space-y-2">

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
                  isActive(link.href)
                    ? "bg-violet-100 text-violet-700 font-semibold"
                    : "hover:bg-gray-100"
                }`}
              >
                <span>{link.icon}</span>
                {link.label}
              </Link>
            ))}

            <hr className="my-3" />

            {isLoggedIn ? (
              <>
                <div className="flex items-center gap-3 px-4 py-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white font-bold">
                    {initial}
                  </div>

                  <div>
                    <span className="text-sm text-gray-500">
                      Hi, {firstName}
                    </span>
                  </div>
                </div>

                <button
                  onClick={logout}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 hover:bg-gray-100 text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="block w-full px-4 py-3 rounded-lg border border-gray-300 hover:bg-gray-100"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="block w-full px-4 py-3 rounded-lg bg-violet-600 text-white hover:bg-violet-700"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;