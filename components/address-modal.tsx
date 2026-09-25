"use client";

import { useState } from "react";

type AddressModalProps = {
  onClose: () => void;
};

export default function AddressModal({ onClose }: AddressModalProps) {
  const [showNewAddress, setShowNewAddress] = useState(false);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="flex h-150 w-150 flex-col bg-white">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h2 className="text-xl font-semibold text-black">My Address</h2>

          <button
            type="button"
            onClick={onClose}
            className="text-5xl font-light text-gray-600 cursor-pointer"
          >
            ×
          </button>
        </div>

        {showNewAddress ? (
          <>
            {/* New Address Form */}
            <div className="flex flex-1 flex-col gap-4 p-6">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="border border-[#858585] px-4 py-3 text-sm placeholder:text-[#858585]"
                />

                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="border border-[#858585] px-4 py-3 text-sm placeholder:text-[#858585]"
                />
              </div>

              <input
                type="text"
                placeholder="Region, Province, City, Barangay"
                className="border border-[#858585] px-4 py-3 text-sm placeholder:text-[#858585]"
              />

              <input
                type="text"
                placeholder="Postal Code"
                className="border border-[#858585] px-4 py-3 text-sm placeholder:text-[#858585]"
              />

              <input
                type="text"
                placeholder="Street Name, Building, House No."
                className="border border-[#858585] px-4 py-3 text-sm placeholder:text-[#858585]"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 border-t border-gray-200 p-6">
              <button
                type="button"
                onClick={() => setShowNewAddress(false)}
                className="rounded-lg px-6 py-3 text-black cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                className="rounded-lg bg-[#9C2327] px-6 py-3 text-white cursor-pointer"
              >
                Submit
              </button>
            </div>
          </>
        ) : (
          <>
            {/* No Address */}
            <div className="flex flex-1 items-center justify-center">
              <p className="text-gray-500">No delivery address added yet.</p>
            </div>

            {/* Bottom */}
            <div className="flex justify-end border-t border-gray-200 p-6">
              <button
                type="button"
                onClick={() => setShowNewAddress(true)}
                className="rounded-lg bg-[#9C2327] px-6 py-3 text-white cursor-pointer"
              >
                + Add New Address
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
