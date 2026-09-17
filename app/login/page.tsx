"use client";

import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      alert("Please enter your email.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!password) {
      alert("Please enter your password.");
      return;
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: trimmedEmail,
        password,
      });

      if (error) {
        alert("Incorrect email or password. Please try again.");
        return;
      }

      router.push("/");
    } catch {
      alert("A network error occurred. Please try again.");
    }
  };
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <header className="flex items-center gap-5 p-4 pl-15 bg-white">
        {/* Header */}

        <div className="flex items-center gap-5">
          <Image src="/shoezam-logo-black.png" alt="ShoeZam logo" width={90} height={90} />
          <span className="text-2xl font-bold text-black">Log In</span>
        </div>
      </header>

      <div className="flex flex-1 bg-black">
        <div className="max-w-6xl mx-auto flex flex-1">
          <div className="w-1/2 flex flex-col items-center justify-center">
            <Image src="/shoezam-logo.png" alt="ShoeZam logo" width={400} height={400} />
            <p className="mt-10 max-w-xs text-xl font-bold text-white text-center">
              The go-to online shop for footwear lovers everywhere.
            </p>
          </div>

          {/* Username & Password */}

          <div className="w-1/2 flex items-center justify-center">
            <div className="bg-white p-8 rounded-3xl w-full max-w-sm">
              <h2 className="text-xl font-bold text-black">Log In</h2>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-5 border border-gray-400 p-3 rounded-lg text-black placeholder:text-gray-400"
              />
              <div className="relative mt-5">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-400 rounded-lg p-3 text-black placeholder:text-gray-400"
                />
                {showPassword ? (
                  <FaEyeSlash
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                  />
                ) : (
                  <FaEye
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                  />
                )}
              </div>

              {/* Login button */}
              <div className="flex items-center mt-4 gap-3">
                <button
                  type="button"
                  onClick={handleLogin}
                  className="border border-gray-400 rounded-lg p-3 w-full flex items-center justify-center gap-2 text-sm bg-[#9C2327] font-bold text-white hover:bg-[#B32C31] cursor-pointer"
                >
                  LOG IN
                </button>
              </div>

              {/* Remember Me & Forgot Password */}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 mt-5">
                  <input type="checkbox" className="accent-black cursor-pointer" />
                  <label className="text-sm text-black">Remember me</label>
                </div>
                <a
                  href="https://shopee.ph/buyer/reset?scenario=7"
                  className="flex items-center mt-5 text-sm text-[#9C2327]"
                >
                  Forgot Password?
                </a>
              </div>

              {/* Divider with "OR" */}

              <div className="flex items-center mt-4 gap-3">
                <div className="flex-1 border-t border-gray-400"></div>
                <span className="text-xs text-gray-400">OR</span>
                <div className="flex-1 border-t border-gray-400"></div>
              </div>

              {/* Third-party accounts button */}

              <div className="flex items-center mt-4 gap-3">
                <button
                  type="button"
                  className="border border-gray-400 rounded-lg p-3 w-full flex items-center justify-center gap-2 text-sm text-black hover:bg-gray-100 cursor-pointer"
                >
                  <FcGoogle className="text-xl" /> Google
                </button>
                <button
                  type="button"
                  className="border border-gray-400 rounded-lg p-3 w-full flex items-center justify-center gap-2 text-sm text-black hover:bg-gray-100 cursor-pointer"
                >
                  <FaFacebook className="text-xl text-[#1877F2]" />
                  Facebook
                </button>
              </div>

              {/* Sign up */}

              <div className="flex items-center justify-center mt-8 gap-1">
                <p className="text-xs text-black">Don&apos;t have an account?</p>
                <Link href="/register" className="text-xs font-bold text-[#9C2327]">
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
