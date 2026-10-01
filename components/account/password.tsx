"use client";

import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { supabase } from "@/lib/supabaseClient";

export default function PasswordTab() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async () => {
    setError("");
    setSuccess("");

    if (!currentPassword) {
      setError("Current password is required.");
      return;
    }

    if (!newPassword) {
      setError("New password is required.");
      return;
    }

    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters long.");
      return;
    }

    if (!confirmPassword) {
      setError("Please confirm your new password.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    if (currentPassword === newPassword) {
      setError("New password must be different from your current password.");
      return;
    }

    // Start loading only after validation passes
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user || !user.email) {
      setLoading(false);
      setError("Unable to find your account.");
      return;
    }

    // Verify current password
    const { error: loginError } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: currentPassword,
    });

    if (loginError) {
      setLoading(false);
      setError("Current password is incorrect.");
      return;
    }

    // Update password
    const { error: updateError } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (updateError) {
      setLoading(false);
      console.error(updateError);
      setError(updateError.message);
      return;
    }

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

    setLoading(false);
    setSuccess("Password changed successfully.");
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-black">Change Password</h2>

      <p className="mt-1 text-sm text-[#858585]">Update your account password.</p>

      {/* Form */}
      <div className="mt-8 max-w-xl space-y-5">
        {/* Current Password */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-black">Current Password</label>

          <div className="relative">
            <input
              type={showCurrentPassword ? "text" : "password"}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full rounded-lg border border-[#DBDBDB] px-4 py-3 pr-12 text-sm text-black outline-none transition placeholder:text-[#858585] focus:border-[#9C2327]"
            />

            {showCurrentPassword ? (
              <FaEyeSlash
                onClick={() => setShowCurrentPassword(false)}
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-[#858585]"
              />
            ) : (
              <FaEye
                onClick={() => setShowCurrentPassword(true)}
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-[#858585]"
              />
            )}
          </div>
        </div>

        {/* New Password */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-black">New Password</label>

          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              placeholder="At least 8 characters"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full rounded-lg border border-[#DBDBDB] px-4 py-3 pr-12 text-sm text-black outline-none transition placeholder:text-[#858585] focus:border-[#9C2327]"
            />

            {showNewPassword ? (
              <FaEyeSlash
                onClick={() => setShowNewPassword(false)}
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-[#858585]"
              />
            ) : (
              <FaEye
                onClick={() => setShowNewPassword(true)}
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-[#858585]"
              />
            )}
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-black">Confirm Password</label>

          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-lg border border-[#DBDBDB] px-4 py-3 pr-12 text-sm text-black outline-none transition placeholder:text-[#858585] focus:border-[#9C2327]"
            />

            {showConfirmPassword ? (
              <FaEyeSlash
                onClick={() => setShowConfirmPassword(false)}
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-[#858585]"
              />
            ) : (
              <FaEye
                onClick={() => setShowConfirmPassword(true)}
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-[#858585]"
              />
            )}
          </div>
        </div>

        {/* Messages */}
        {error && <p className="text-sm text-[#9C2327]">{error}</p>}

        {success && <p className="text-sm text-green-600">{success}</p>}
      </div>

      {/* Button */}
      <div className="mt-8">
        <button
          type="button"
          onClick={handleChangePassword}
          disabled={loading}
          className="cursor-pointer rounded-lg bg-[#9C2327] px-6 py-3 font-semibold text-white transition hover:bg-[#7F1D20] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Changing..." : "Change Password"}
        </button>
      </div>
    </div>
  );
}
