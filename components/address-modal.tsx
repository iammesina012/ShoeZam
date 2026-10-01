"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Address = {
  id: string;
  full_name: string;
  phone_number: string;
  location: string;
  street_address: string;
  postal_code: string;
  created_at: string;
};

type CheckoutAddress = {
  fullName: string;
  phoneNumber: string;
  location: string;
  postalCode: string;
  streetAddress: string;
};

type AddressModalProps = {
  onClose: () => void;
  onSelectAddress: (address: CheckoutAddress) => void;
};

export default function AddressModal({ onClose, onSelectAddress }: AddressModalProps) {
  const [showNewAddress, setShowNewAddress] = useState(false);

  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadAddresses = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("addresses")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: true });

      if (error) {
        console.error(error);
        setLoading(false);
        return;
      }

      setAddresses(data || []);
      setLoading(false);
    };

    loadAddresses();
  }, []);

  const clearForm = () => {
    setFullName("");
    setPhoneNumber("");
    setLocation("");
    setPostalCode("");
    setStreetAddress("");
    setEditingAddress(null);
  };

  const handleAddAddress = () => {
    clearForm();
    setShowNewAddress(true);
  };

  const handleEditAddress = (address: Address) => {
    setEditingAddress(address);
    setFullName(address.full_name);
    setPhoneNumber(address.phone_number);
    setLocation(address.location);
    setPostalCode(address.postal_code);
    setStreetAddress(address.street_address);
    setShowNewAddress(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSaving(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setSaving(false);
      return;
    }

    const addressData = {
      full_name: fullName.trim(),
      phone_number: phoneNumber.trim(),
      location: location.trim(),
      street_address: streetAddress.trim(),
      postal_code: postalCode.trim(),
    };

    if (editingAddress) {
      const { data, error } = await supabase
        .from("addresses")
        .update(addressData)
        .eq("id", editingAddress.id)
        .select()
        .single();

      if (error) {
        console.error(error);
        setSaving(false);
        return;
      }

      setAddresses((currentAddresses) =>
        currentAddresses.map((address) => (address.id === editingAddress.id ? data : address)),
      );
    } else {
      const { data, error } = await supabase
        .from("addresses")
        .insert({
          user_id: user.id,
          ...addressData,
        })
        .select()
        .single();

      if (error) {
        console.error(error);
        setSaving(false);
        return;
      }

      setAddresses((currentAddresses) => [...currentAddresses, data]);
    }

    clearForm();
    setShowNewAddress(false);
    setSaving(false);
  };

  const handleCancel = () => {
    clearForm();
    setShowNewAddress(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="flex h-150 w-150 flex-col bg-white">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h2 className="text-xl font-semibold text-black">My Address</h2>

          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer text-5xl font-light text-[#858585]"
          >
            ×
          </button>
        </div>

        {showNewAddress ? (
          <>
            {/* New / Edit Address Form */}
            <form
              id="address-form"
              onSubmit={handleSubmit}
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
                onClick={handleCancel}
                className="cursor-pointer rounded-lg px-6 py-3 text-black"
              >
                Cancel
              </button>

              <button
                type="submit"
                form="address-form"
                disabled={saving}
                className="cursor-pointer rounded-lg bg-[#9C2327] px-6 py-3 text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving ? "Saving..." : editingAddress ? "Save Changes" : "Submit"}
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Address List */}
            <div className="flex min-h-0 flex-1 flex-col">
              {loading ? (
                <div className="flex flex-1 items-center justify-center">
                  <p className="text-gray-500">Loading addresses...</p>
                </div>
              ) : addresses.length > 0 ? (
                <div className="min-h-0 flex-1 overflow-auto">
                  {addresses.map((address) => (
                    <div
                      key={address.id}
                      className="flex w-full items-start gap-4 p-6 text-sm text-black"
                    >
                      <label className="flex flex-1 cursor-pointer items-start gap-4">
                        <input
                          type="radio"
                          name="address"
                          checked={selectedAddress === address.id}
                          onChange={() => {
                            setSelectedAddress(address.id);

                            onSelectAddress({
                              fullName: address.full_name,
                              phoneNumber: address.phone_number,
                              location: address.location,
                              postalCode: address.postal_code,
                              streetAddress: address.street_address,
                            });
                          }}
                          className="mt-1 accent-[#9C2327]"
                        />

                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <p className="font-semibold">{address.full_name}</p>

                            <span className="border-l border-gray-300 pl-3 text-[#858585]">
                              {address.phone_number}
                            </span>
                          </div>

                          <p className="mt-1 text-[#858585]">{address.street_address}</p>

                          <p className="text-[#858585]">
                            {address.location}, {address.postal_code}
                          </p>
                        </div>
                      </label>

                      <button
                        type="button"
                        onClick={() => handleEditAddress(address)}
                        className="cursor-pointer font-semibold text-blue-500"
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
                  onClick={handleAddAddress}
                  className="cursor-pointer rounded-lg bg-[#9C2327] px-6 py-3 text-white"
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
