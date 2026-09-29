"use client";

import { useState } from "react";
import { FiUpload, FiTrash2 } from "react-icons/fi";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <main className="min-h-screen bg-[#F2F2F2] py-8">
      <div className="rounded-2xl bg-white shadow-sm">
        {/* Page Header */}
        <div className="border-b border-gray-200 px-6 py-5 sm:px-8">
          <h1 className="text-2xl font-bold text-black">Settings</h1>
        </div>

        {/* Tabs */}
        <div className="overflow-x-auto border-b border-gray-200">
          <div className="flex min-w-max px-6 sm:px-8">
            {/* Profile */}
            <button
              type="button"
              onClick={() => setActiveTab("profile")}
              className={`border-b-2 px-4 py-4 text-sm font-semibold transition ${
                activeTab === "profile"
                  ? "border-[#9C2327] text-[#9C2327]"
                  : "border-transparent text-[#858585] hover:text-black"
              }`}
            >
              Profile
            </button>

            {/* Change Password */}
            <button
              type="button"
              onClick={() => setActiveTab("password")}
              className={`border-b-2 px-4 py-4 text-sm font-semibold transition ${
                activeTab === "password"
                  ? "border-[#9C2327] text-[#9C2327]"
                  : "border-transparent text-[#858585] hover:text-black"
              }`}
            >
              Change Password
            </button>

            {/* Addresses */}
            <button
              type="button"
              onClick={() => setActiveTab("addresses")}
              className={`border-b-2 px-4 py-4 text-sm font-semibold transition ${
                activeTab === "addresses"
                  ? "border-[#9C2327] text-[#9C2327]"
                  : "border-transparent text-[#858585] hover:text-black"
              }`}
            >
              Addresses
            </button>

            {/* E-Wallets & Cards */}
            <button
              type="button"
              onClick={() => setActiveTab("wallets")}
              className={`border-b-2 px-4 py-4 text-sm font-semibold transition ${
                activeTab === "wallets"
                  ? "border-[#9C2327] text-[#9C2327]"
                  : "border-transparent text-[#858585] hover:text-black"
              }`}
            >
              E-Wallets & Cards
            </button>

            {/* Privacy */}
            <button
              type="button"
              onClick={() => setActiveTab("privacy")}
              className={`border-b-2 px-4 py-4 text-sm font-semibold transition ${
                activeTab === "privacy"
                  ? "border-[#9C2327] text-[#9C2327]"
                  : "border-transparent text-[#858585] hover:text-black"
              }`}
            >
              Privacy
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-8 sm:px-8 lg:px-12">
          {/* Profile */}
          {activeTab === "profile" && (
            <div>
              <h2 className="text-xl font-bold text-black">My Profile</h2>

              <p className="mt-1 text-sm text-[#858585]">Manage your personal information.</p>

              {/* Profile Picture */}
              <div className="mt-8">
                <h3 className="text-sm font-semibold text-black">Profile Picture</h3>

                <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-[#F2F2F2]">
                    <span className="text-2xl font-bold text-[#858585]">M</span>
                  </div>

                  <div>
                    <button
                      type="button"
                      className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-black transition hover:border-[#9C2327] hover:text-[#9C2327]"
                    >
                      <FiUpload />
                      Upload New Photo
                    </button>

                    <p className="mt-2 text-xs text-[#858585]">
                      JPG or PNG. Maximum file size: 1 MB.
                    </p>
                  </div>
                </div>
              </div>

              {/* Form */}
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                {/* First Name */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-black">First Name</label>

                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#9C2327]"
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-black">Last Name</label>

                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#9C2327]"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-black">
                    Email Address
                  </label>

                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#9C2327]"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-black">Phone</label>

                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#9C2327]"
                  />
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-black">
                    Date of Birth
                  </label>

                  <input
                    type="date"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#9C2327]"
                  />
                </div>

                {/* Alternate Mobile */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-black">
                    Alternate Mobile Details
                  </label>

                  <input
                    type="tel"
                    placeholder="Mobile Details"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#9C2327]"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  className="rounded-lg bg-[#9C2327] px-6 py-3 font-semibold text-white transition hover:opacity-90 cursor-pointer"
                >
                  Save Details
                </button>

                <button
                  type="button"
                  className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-black transition hover:bg-[#F2F2F2] cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Change Password */}
          {activeTab === "password" && (
            <div>
              <h2 className="text-xl font-bold text-black">Change Password</h2>

              <p className="mt-1 text-sm text-[#858585]">Update your account password.</p>
            </div>
          )}

          {/* Addresses */}
          {activeTab === "addresses" && (
            <div>
              <h2 className="text-xl font-bold text-black">Addresses</h2>

              <p className="mt-1 text-sm text-[#858585]">Manage your saved delivery addresses.</p>
            </div>
          )}

          {/* E-Wallets & Cards */}
          {activeTab === "wallets" && (
            <div>
              <h2 className="text-xl font-bold text-black">E-Wallets & Cards</h2>

              <p className="mt-1 text-sm text-[#858585]">Manage your saved payment methods.</p>
            </div>
          )}

          {/* Privacy */}
          {activeTab === "privacy" && (
            <div>
              <h2 className="text-xl font-bold text-black">Privacy</h2>

              <p className="mt-1 text-sm text-[#858585]">
                Manage your privacy and account settings.
              </p>

              <div className="mt-8 rounded-xl border border-red-200 p-5">
                <h3 className="font-semibold text-black">Delete Account</h3>

                <p className="mt-1 text-sm text-[#858585]">
                  Permanently delete your ShoeZam account and associated information.
                </p>

                <button
                  type="button"
                  className="mt-5 flex items-center gap-2 rounded-lg border border-[#9C2327] px-5 py-3 font-semibold text-[#9C2327] transition hover:bg-[#9C2327] hover:text-white cursor-pointer"
                >
                  <FiTrash2 />
                  Delete Account
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
