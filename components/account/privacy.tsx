import { FiTrash2 } from "react-icons/fi";

export default function PrivacyTab() {
  return (
    <div>
      <h2 className="text-xl font-bold text-black">Privacy</h2>

      <p className="mt-1 text-sm text-[#858585]">Manage your privacy and account settings.</p>

      <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="font-semibold text-black">Delete Account</h3>

          <p className="mt-1 text-sm text-[#858585]">
            Permanently delete your ShoeZam account and associated information.
          </p>
        </div>

        <button
          type="button"
          className="flex w-fit items-center gap-2 rounded-lg border border-[#9C2327] px-6 py-3 font-semibold text-[#9C2327] transition hover:bg-[#9C2327] hover:text-white cursor-pointer"
        >
          <FiTrash2 />
          Delete Account
        </button>
      </div>
    </div>
  );
}
