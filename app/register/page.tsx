"use client";

import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    const trimmedFirstName = firstName.trim();
    const trimmedLastName = lastName.trim();
    const trimmedEmail = email.trim();

    if (!trimmedFirstName) {
      alert("First name is required");
      return;
    }

    if (!trimmedLastName) {
      alert("Last name is required");
      return;
    }

    if (!trimmedEmail) {
      alert("Email is required");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      alert("Please enter a valid email address");
      return;
    }

    if (!password) {
      alert("Password is required");
      return;
    }

    if (password.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    }

    if (!confirmPassword) {
      alert("You need to confirm your password");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email: trimmedEmail,
        password,
        options: {
          data: {
            first_name: trimmedFirstName,
            last_name: trimmedLastName,
          },
        },
      });

      if (error) {
        alert(error.message);
        return;
      }

      alert("Account created! Check your email to confirm.");
    } catch {
      alert("A network error occurred. Please try again.");
    }
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <header className="header flex items-center gap-4 p-4 bg-white">
        {/* Header */}

        <div className="flex items-center gap-4">
          <Image src="/shoezam-logo-black.png" alt="ShoeZam logo" width={90} height={90} />

          <span className="text-3xl text-black">|</span>

          <span className="text-lg font-bold text-black">Sign Up</span>
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

          {/* First Name / Last Name / Email / Password / Confirm Password */}

          <div className="w-1/2 flex items-center justify-center">
            <div className="bg-white p-8 rounded-3xl w-full max-w-sm">
              <h2 className="text-xl font-bold text-black">Create an account</h2>

              <div className="flex gap-3 mt-5">
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full border border-[#858585] p-3 rounded-lg placeholder:text-sm text-black placeholder:text-[#858585]"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />

                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full border border-[#858585] p-3 rounded-lg placeholder:text-sm text-black placeholder:text-[#858585]"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>

              <input
                type="email"
                placeholder="Email (you@example.com)"
                className="w-full mt-5 border border-[#858585] p-3 rounded-lg placeholder:text-sm text-black placeholder:text-[#858585]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <div className="relative mt-5">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password (At least 8 characters)"
                  className="w-full border border-[#858585] rounded-lg p-3 placeholder:text-sm text-black placeholder:text-[#858585]"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                {showPassword ? (
                  <FaEyeSlash
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-[#858585] cursor-pointer"
                  />
                ) : (
                  <FaEye
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-[#858585] cursor-pointer"
                  />
                )}
              </div>

              <div className="relative mt-5">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Re-enter your password"
                  className="w-full border border-[#858585] rounded-lg p-3 placeholder:text-sm text-black placeholder:text-[#858585]"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />

                {showConfirmPassword ? (
                  <FaEyeSlash
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-[#858585] cursor-pointer"
                  />
                ) : (
                  <FaEye
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-[#858585] cursor-pointer"
                  />
                )}
              </div>

              {/* Register button */}

              <div className="flex items-center mt-4 gap-3">
                <button
                  type="button"
                  onClick={handleRegister}
                  className="rounded-lg p-3 w-full flex items-center justify-center gap-2 text-sm bg-[#9C2327] font-bold text-white hover:bg-[#B32C31] cursor-pointer"
                >
                  REGISTER
                </button>
              </div>

              {/* Divider with "OR" */}

              <div className="flex items-center mt-4 gap-3">
                <div className="flex-1 border-t border-[#858585]"></div>

                <span className="text-xs text-[#858585]">OR</span>

                <div className="flex-1 border-t border-[#858585]"></div>
              </div>

              {/* Third-party accounts button */}

              <div className="flex items-center mt-4 gap-3">
                <button
                  type="button"
                  className="border border-[#858585] rounded-lg p-3 w-full flex items-center justify-center gap-2 text-sm text-black hover:bg-gray-100 cursor-pointer"
                >
                  <FcGoogle className="text-xl" /> Google
                </button>

                <button
                  type="button"
                  className="border border-[#858585] rounded-lg p-3 w-full flex items-center justify-center gap-2 text-sm text-black hover:bg-gray-100 cursor-pointer"
                >
                  <FaFacebook className="text-xl text-[#1877F2]" />
                  Facebook
                </button>
              </div>

              {/* Log in */}

              <div className="flex items-center justify-center mt-8 gap-1">
                <p className="text-xs text-black">Already have an account?</p>

                <Link href="/login" className="text-xs font-bold text-[#9C2327] hover:underline">
                  Log In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
