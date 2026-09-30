export default function PasswordTab() {
  return (
    <div>
      <h2 className="text-xl font-bold text-black">Change Password</h2>

      <p className="mt-1 text-sm text-[#858585]">Update your account password.</p>

      {/* Form */}
      <div className="mt-8 max-w-xl space-y-5">
        {/* Current Password */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-black">Current Password</label>

          <input
            type="password"
            className="w-full rounded-lg border border-[#DBDBDB] px-4 py-3 text-sm outline-none transition placeholder:text-[#858585] focus:border-[#9C2327]"
          />
        </div>

        {/* New Password */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-black">New Password</label>

          <input
            type="password"
            placeholder="At least 8 characters"
            className="w-full rounded-lg border border-[#DBDBDB] px-4 py-3 text-sm outline-none transition placeholder:text-[#858585] focus:border-[#9C2327]"
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-black">Confirm Password</label>

          <input
            type="password"
            className="w-full rounded-lg border border-[#DBDBDB] px-4 py-3 text-sm outline-none transition placeholder:text-[#858585] focus:border-[#9C2327]"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          className="rounded-lg bg-[#9C2327] px-6 py-3 font-semibold text-white transition hover:bg-[#7F1D20] cursor-pointer"
        >
          Change Password
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
