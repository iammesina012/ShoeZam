"use client";

import { useState } from "react";
import { FiUpload } from "react-icons/fi";

export default function ProfileTab() {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleProfileImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      return;
    }

    const imageUrl = URL.createObjectURL(file);

    setProfileImage(imageUrl);
  };
  return (
    <div>
      <h2 className="text-xl font-bold text-black">My Profile</h2>

      <p className="mt-1 text-sm text-[#858585]">Manage your personal information.</p>

      {/* Profile Picture */}
      <div className="mt-8">
        <h3 className="text-sm font-semibold text-black">Profile Picture</h3>

        <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-center">
          {/* Profile Picture */}
          <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#F2F2F2]">
            {profileImage ? (
              <img src={profileImage} alt="Profile" className="h-full w-full object-cover" />
            ) : (
              <span className="text-2xl font-bold text-[#858585]"></span>
            )}
          </div>

          <div>
            {/* Hidden File Input */}
            <input
              type="file"
              accept="image/png, image/jpeg"
              id="profile-image"
              className="hidden"
              onChange={handleProfileImage}
            />

            {/* Upload Button */}
            <label
              htmlFor="profile-image"
              className="flex w-fit cursor-pointer items-center gap-2 rounded-lg border border-[#DBDBDB] px-4 py-2 text-sm font-semibold text-black transition hover:border-[#9C2327] hover:text-[#9C2327]"
            >
              <FiUpload />
              Upload New Photo
            </label>

            <p className="mt-2 text-xs text-[#858585]">JPG or PNG. Maximum file size: 1 MB.</p>
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
            className="w-full rounded-lg border border-[#DBDBDB] px-4 py-3 text-sm outline-none transition focus:border-[#9C2327]"
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-black">Last Name</label>

          <input
            type="text"
            className="w-full rounded-lg border border-[#DBDBDB] px-4 py-3 text-sm outline-none transition focus:border-[#9C2327]"
          />
        </div>

        {/* Email */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-black">Email Address</label>

          <input
            type="email"
            className="w-full rounded-lg border border-[#DBDBDB] px-4 py-3 text-sm outline-none transition focus:border-[#9C2327]"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-black">Phone Number</label>

          <input
            type="tel"
            className="w-full rounded-lg border border-[#DBDBDB] px-4 py-3 text-sm outline-none transition focus:border-[#9C2327]"
          />
        </div>

        {/* Date of Birth */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-black">Date of Birth</label>

          <input
            type="date"
            className="w-full rounded-lg border border-[#DBDBDB] px-4 py-3 text-sm outline-none transition text-[#858585] focus:border-[#9C2327]"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-black">Gender</label>

          <div className="flex flex-wrap gap-6 pt-2 accent-[#9C2327]">
            <label className="flex items-center gap-2 text-sm text-black">
              <input type="radio" name="gender" value="male" />
              Male
            </label>

            <label className="flex items-center gap-2 text-sm text-black">
              <input type="radio" name="gender" value="female" />
              Female
            </label>

            <label className="flex items-center gap-2 text-sm text-black">
              <input type="radio" name="gender" value="other" />
              Other
            </label>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          className="rounded-lg bg-[#9C2327] px-6 py-3 font-semibold text-white transition hover:bg-[#7F1D20] cursor-pointer"
        >
          Save Details
        </button>

        <button
          type="button"
          className="rounded-lg border border-[#DBDBDB] px-6 py-3 font-semibold text-black transition hover:bg-[#F2F2F2] cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
