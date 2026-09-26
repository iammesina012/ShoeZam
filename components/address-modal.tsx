"use client";

import { useEffect, useState } from "react";

type AddressModalProps = {
  onClose: () => void;
  onSelectAddress: (address: any) => void;
};

export default function AddressModal({ onClose, onSelectAddress }: AddressModalProps) {
  const [showNewAddress, setShowNewAddress] = useState(false);

  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");

  const [addresses, setAddresses] = useState<any[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  useEffect(() => {
    const savedAddresses = localStorage.getItem("deliveryAddresses");
    const savedSelectedAddress = localStorage.getItem("selectedDeliveryAddress");

    if (savedAddresses) {
      setAddresses(JSON.parse(savedAddresses));
    }

    if (savedSelectedAddress && savedAddresses) {
      const selected = JSON.parse(savedSelectedAddress);
      const savedAddressList = JSON.parse(savedAddresses);

      const selectedIndex = savedAddressList.findIndex(
        (address: any) =>
          address.fullName === selected.fullName &&
          address.phoneNumber === selected.phoneNumber &&
          address.streetAddress === selected.streetAddress,
      );

      if (selectedIndex !== -1) {
        setSelectedAddress(selectedIndex);
      }
    }
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="flex h-150 w-150 flex-col bg-white">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h2 className="text-xl font-semibold text-black">My Address</h2>

          <button
            type="button"
            onClick={onClose}
            className="text-5xl font-light text-[#858585] cursor-pointer"
          >
            ×
          </button>
        </div>

        {showNewAddress ? (
          <>
            {/* New Address Form */}
            <form
              id="address-form"
              onSubmit={(e) => {
                e.preventDefault();

                const newAddress = {
                  fullName: fullName.trim(),
                  phoneNumber: phoneNumber.trim(),
                  location: location.trim(),
                  postalCode: postalCode.trim(),
                  streetAddress: streetAddress.trim(),
                };

                let updatedAddresses;

                if (editingIndex !== null) {
                  updatedAddresses = [...addresses];
                  updatedAddresses[editingIndex] = newAddress;
                } else {
                  updatedAddresses = [...addresses, newAddress];
                }

                localStorage.setItem("deliveryAddresses", JSON.stringify(updatedAddresses));

                setAddresses(updatedAddresses);
                setEditingIndex(null);
                setShowNewAddress(false);
              }}
              className="flex flex-1 flex-col gap-4 p-6"
            >
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => {
                    const value = e.target.value;

                    if (!/\d/.test(value)) {
                      setFullName(value);
                    }
                  }}
                  required
                  className="border border-[#858585] px-4 py-3 text-sm text-black placeholder:text-[#858585]"
                />

                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={(e) => {
                    const value = e.target.value;

                    if (!/[a-zA-Z]/.test(value)) {
                      setPhoneNumber(value);
                    }
                  }}
                  required
                  className="border border-[#858585] px-4 py-3 text-sm text-black placeholder:text-[#858585]"
                />
              </div>

              <input
                type="text"
                placeholder="Region, Province, City, Barangay"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                className="border border-[#858585] px-4 py-3 text-sm text-black placeholder:text-[#858585]"
              />

              <input
                type="text"
                placeholder="Postal Code"
                value={postalCode}
                onChange={(e) => {
                  const value = e.target.value;

                  if (/^\d{0,4}$/.test(value)) {
                    setPostalCode(value);
                  }
                }}
                required
                pattern="[0-9]{4}"
                title="Postal code must be exactly 4 digits"
                className="border border-[#858585] px-4 py-3 text-sm text-black placeholder:text-[#858585]"
              />

              <input
                type="text"
                placeholder="Street Name, Building, House No."
                value={streetAddress}
                onChange={(e) => setStreetAddress(e.target.value)}
                required
                className="border border-[#858585] px-4 py-3 text-sm text-black placeholder:text-[#858585]"
              />
            </form>

            {/* Buttons */}
            <div className="flex justify-end gap-4 border-t border-gray-200 p-6">
              <button
                type="button"
                onClick={() => {
                  setEditingIndex(null);
                  setShowNewAddress(false);
                }}
                className="rounded-lg px-6 py-3 text-black cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                form="address-form"
                className="rounded-lg bg-[#9C2327] px-6 py-3 text-white cursor-pointer"
              >
                Submit
              </button>
            </div>
          </>
        ) : (
          <>
            {/* No Address */}
            <div className="flex min-h-0 flex-1 flex-col">
              {addresses.length > 0 ? (
                <div className="min-h-0 flex-1 overflow-auto">
                  {addresses.map((address, index) => (
                    <div
                      key={index}
                      className="flex w-full items-start gap-4 p-6 text-sm text-black"
                    >
                      <label className="flex flex-1 items-start gap-4 cursor-pointer">
                        <input
                          type="radio"
                          name="address"
                          checked={selectedAddress === index}
                          onChange={() => {
                            setSelectedAddress(index);
                            onSelectAddress(address);
                          }}
                          className="mt-1 accent-[#9C2327]"
                        />

                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <p className="font-semibold">{address.fullName}</p>

                            <span className="border-l border-gray-300 pl-3 text-[#858585]">
                              {address.phoneNumber}
                            </span>
                          </div>

                          <p className="mt-1 text-[#858585]">{address.streetAddress}</p>

                          <p className="text-[#858585]">
                            {address.location}, {address.postalCode}
                          </p>
                        </div>
                      </label>

                      <button
                        type="button"
                        onClick={() => {
                          setEditingIndex(index);
                          setFullName(address.fullName);
                          setPhoneNumber(address.phoneNumber);
                          setLocation(address.location);
                          setPostalCode(address.postalCode);
                          setStreetAddress(address.streetAddress);
                          setShowNewAddress(true);
                        }}
                        className="font-semibold text-blue-500 cursor-pointer"
                      >
                        Edit
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-1 items-center justify-center">
                  <p className="text-gray-500">No delivery address added yet.</p>
                </div>
              )}

              {/* Add New Address */}
              <div className="flex justify-end border-t border-gray-200 p-6">
                <button
                  type="button"
                  onClick={() => {
                    setEditingIndex(null);
                    setFullName("");
                    setPhoneNumber("");
                    setLocation("");
                    setPostalCode("");
                    setStreetAddress("");
                    setShowNewAddress(true);
                  }}
                  className="rounded-lg bg-[#9C2327] px-6 py-3 text-white cursor-pointer"
                >
                  + Add New Address
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
