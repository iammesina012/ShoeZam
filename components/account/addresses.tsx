export default function AddressesTab() {
  return (
    <div>
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-black">My Addresses</h2>

          <p className="mt-1 text-sm text-[#858585]">Manage your saved delivery addresses.</p>
        </div>

        <button
          type="button"
          className="w-fit rounded-lg bg-[#9C2327] px-5 py-3 font-semibold text-white transition hover:bg-[#7F1D20] cursor-pointer"
        >
          + Add Address
        </button>
      </div>

      {/* Address */}
      <div className="mt-8 rounded-xl border border-[#DBDBDB] p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          {/* Address Information */}
          <div className="text-sm text-black">
            <div className="flex flex-wrap items-center gap-3">
              <p className="font-semibold">Michael William Mesina</p>

              <span className="border-l border-[#DBDBDB] pl-3 text-[#858585]">
                (+63) 992 408 2292
              </span>
            </div>

            <p className="mt-1 text-[#858585]">Blk 6 Lot 13 St. Luke Drive, Palmera IV</p>

            <p className="text-[#858585]">Dolores (Pob.), Taytay, Rizal, South Luzon, 1920</p>
          </div>

          {/* Actions */}
          <div className="flex shrink-0 items-center gap-4">
            <button
              type="button"
              className="font-semibold text-[#9C2327] transition hover:opacity-70 cursor-pointer"
            >
              Edit
            </button>

            <span className="border-l-2 border-[#DBDBDB] pl-4 text-[#858585]">
              <button
                type="button"
                className="font-semibold text-[#9C2327] transition hover:opacity-70 cursor-pointer"
              >
                Delete
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
