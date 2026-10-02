"use client";

import { useEffect, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import { supabase } from "@/lib/supabaseClient";

export default function ProfileTab() {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [imageError, setImageError] = useState("");
  const [hasChanges, setHasChanges] = useState(false);
  const [loading, setLoading] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [savedProfile, setSavedProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const loadProfileImage = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user?.user_metadata?.avatar_url) {
        setProfileImage(`${user.user_metadata.avatar_url}?t=${Date.now()}`);
      }
    };

    loadProfileImage();
  }, []);

  useEffect(() => {
    const loadProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return;
      }

      setFirstName(user.user_metadata?.first_name || "");
      setLastName(user.user_metadata?.last_name || "");
      setEmail(user.email || "");
      setPhone(user.user_metadata?.phone || "");

      setSavedProfile({
        firstName: user.user_metadata?.first_name || "",
        lastName: user.user_metadata?.last_name || "",
        email: user.email || "",
        phone: user.user_metadata?.phone || "",
      });
    };

    loadProfile();
  }, []);

  useEffect(() => {
    const profileChanged =
      firstName !== savedProfile.firstName ||
      lastName !== savedProfile.lastName ||
      email !== savedProfile.email ||
      phone !== savedProfile.phone ||
      profileImageFile !== null;

    setHasChanges(profileChanged);
  }, [firstName, lastName, email, phone, savedProfile, profileImageFile]);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!hasChanges) {
        return;
      }

      event.preventDefault();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [hasChanges]);

  const handleProfileImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (file.type !== "image/jpeg" && file.type !== "image/png") {
      setImageError("Only JPG and PNG images are allowed.");
      return;
    }

    if (file.size > 1024 * 1024) {
      setImageError("Image must be 1 MB or smaller.");
      return;
    }

    setImageError("");
    setProfileImageFile(file);
    setProfileImage(URL.createObjectURL(file));
    setHasChanges(true);
  };

  const handleSave = async () => {
    const trimmedFirstName = firstName.trim();
    const trimmedLastName = lastName.trim();
    const trimmedPhone = phone.trim();
    const trimmedEmail = email.trim();

    if (!trimmedFirstName) {
      alert("First name is required.");
      return;
    }

    if (!trimmedLastName) {
      alert("Last name is required.");
      return;
    }

    if (trimmedPhone && !/^\+?[0-9]+$/.test(trimmedPhone)) {
      alert("Please enter a valid phone number.");
      return;
    }

    // Start loading only after validation passes
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    // Update email if it was changed
    if (trimmedEmail !== user.email) {
      const { error: emailError } = await supabase.auth.updateUser({
        email: trimmedEmail,
      });

      if (emailError) {
        setLoading(false);
        console.error(emailError);
        alert(emailError.message);
        return;
      }
    }

    // Update profile picture if a new one was selected
    if (profileImageFile) {
      const filePath = `${user.id}/profile`;

      const { error: uploadError } = await supabase.storage
        .from("profile-images")
        .upload(filePath, profileImageFile, {
          upsert: true,
        });

      if (uploadError) {
        setLoading(false);
        console.error(uploadError);
        setImageError("Failed to upload image.");
        return;
      }

      const { data } = supabase.storage.from("profile-images").getPublicUrl(filePath);

      const { error: updateError } = await supabase.auth.updateUser({
        data: {
          first_name: trimmedFirstName,
          last_name: trimmedLastName,
          phone: trimmedPhone,
          avatar_url: data.publicUrl,
        },
      });

      if (updateError) {
        setLoading(false);
        console.error(updateError);
        setImageError("Failed to save profile details.");
        return;
      }

      setProfileImage(`${data.publicUrl}?t=${Date.now()}`);
      setProfileImageFile(null);
    } else {
      // Update profile details
      const { error } = await supabase.auth.updateUser({
        data: {
          first_name: trimmedFirstName,
          last_name: trimmedLastName,
          phone: trimmedPhone,
        },
      });

      if (error) {
        setLoading(false);
        console.error(error);
        return;
      }
    }

    setSavedProfile({
      firstName: trimmedFirstName,
      lastName: trimmedLastName,
      email: trimmedEmail,
      phone: trimmedPhone,
    });

    setHasChanges(false);

    setLoading(false);
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-black">My Profile</h2>

      <p className="mt-1 text-sm text-[#858585]">Manage your personal information.</p>

      {/* Profile Picture */}
      <div className="mt-8">
        <h3 className="text-sm font-semibold text-black">Profile Picture</h3>

        <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#F2F2F2]">
            {profileImage ? (
              <img src={profileImage} alt="Profile" className="h-full w-full object-cover" />
            ) : (
              <FaUser className="mt-6 text-6xl text-[#858585]" />
            )}
          </div>

          <div>
            <input
              type="file"
              accept="image/png, image/jpeg"
              id="profile-image"
              className="hidden"
              onChange={handleProfileImage}
            />

            <label
              htmlFor="profile-image"
              className="flex w-fit cursor-pointer items-center gap-2 rounded-lg border border-[#DBDBDB] px-4 py-2 text-sm font-semibold text-black transition hover:border-[#9C2327] hover:text-[#9C2327]"
            >
              <FiUpload />
              Upload New Photo
            </label>

            {imageError && <p className="mt-2 text-xs text-[#9C2327]">{imageError}</p>}

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
            value={firstName}
            onChange={(e) => {
              const value = e.target.value;

              if (/^[A-Za-zÀ-ÿ' -]*$/.test(value)) {
                setFirstName(value);
              }
            }}
            className="w-full rounded-lg border border-[#DBDBDB] px-4 py-3 text-sm text-black outline-none transition focus:border-[#9C2327]"
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-black">Last Name</label>

          <input
            type="text"
            value={lastName}
            onChange={(e) => {
              const value = e.target.value;

              if (/^[A-Za-zÀ-ÿ' -]*$/.test(value)) {
                setLastName(value);
              }
            }}
            className="w-full rounded-lg border border-[#DBDBDB] px-4 py-3 text-sm text-black outline-none transition focus:border-[#9C2327]"
          />
        </div>

        {/* Email */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-black">Email Address</label>

          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="w-full rounded-lg border border-[#DBDBDB] px-4 py-3 text-sm text-black outline-none transition focus:border-[#9C2327]"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-black">Phone Number</label>

          <input
            type="tel"
            value={phone}
            onChange={(e) => {
              const value = e.target.value;

              if (/^\+?[0-9]*$/.test(value)) {
                setPhone(value);
              }
            }}
            className="w-full rounded-lg border border-[#DBDBDB] px-4 py-3 text-sm text-black outline-none transition focus:border-[#9C2327]"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={handleSave}
          disabled={!hasChanges || loading}
          className={`rounded-lg px-6 py-3 font-semibold transition ${
            hasChanges && !loading
              ? "cursor-pointer bg-[#9C2327] text-white hover:bg-[#7F1D20]"
              : "cursor-not-allowed bg-[#DBDBDB] text-[#858585]"
          }`}
        >
          {loading ? "Saving..." : "Save Details"}
        </button>
      </div>
    </div>
  );
}
