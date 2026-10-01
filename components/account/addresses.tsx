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

export default function AddressesTab() {
  const [addresses, setAddresses] = useState<Address[]>([]);

  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [deleteAddress, setDeleteAddress] = useState<Address | null>(null);

  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Load addresses from Supabase
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

  // Clear form
  const clearForm = () => {
    setFullName("");
    setPhoneNumber("");
    setLocation("");
    setPostalCode("");
    setStreetAddress("");
    setEditingAddress(null);
  };

  // Open Add Address form
  const handleAddAddress = () => {
    clearForm();
    setShowForm(true);
  };

  // Open Edit Address form
  const handleEditAddress = (address: Address) => {
    setFullName(address.full_name);
    setPhoneNumber(address.phone_number);
    setLocation(address.location);
    setPostalCode(address.postal_code);
    setStreetAddress(address.street_address);

    setEditingAddress(address);
    setShowForm(true);
  };

  // Save address
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
      // Update existing address
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
      // Add new address
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
    setShowForm(false);
    setSaving(false);
  };

  // Cancel Add/Edit
  const handleCancel = () => {
    clearForm();
    setShowForm(false);
  };

  // Confirm delete
  const handleConfirmDelete = async () => {
    if (!deleteAddress) return;

    setDeleting(true);

    const { error } = await supabase.from("addresses").delete().eq("id", deleteAddress.id);

    if (error) {
      console.error(error);
      setDeleting(false);
      return;
    }

    setAddresses((currentAddresses) =>
      currentAddresses.filter((address) => address.id !== deleteAddress.id),
    );

    setDeleteAddress(null);
    setDeleting(false);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-black">My Addresses</h2>

          <p className="mt-1 text-sm text-[#858585]">Manage your saved delivery addresses.</p>
        </div>

        {!showForm && (
          <button
            type="button"
            onClick={handleAddAddress}
            className="w-fit cursor-pointer rounded-lg bg-[#9C2327] px-5 py-3 font-semibold text-white transition hover:bg-[#7F1D20]"
          >
            + Add Address
          </button>
        )}
      </div>

      {/* Add / Edit Form */}
      {showForm ? (
        <form onSubmit={handleSubmit} className="mt-8 max-w-2xl space-y-4">
          {/* Full Name + Phone Number */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
              className="w-full rounded-lg border border-[#858585] px-4 py-3 text-sm text-black outline-none placeholder:text-[#858585] focus:border-[#9C2327]"
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
              className="w-full rounded-lg border border-[#858585] px-4 py-3 text-sm text-black outline-none placeholder:text-[#858585] focus:border-[#9C2327]"
            />
          </div>

          {/* Location */}
          <input
            type="text"
            placeholder="Region, Province, City, Barangay"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="w-full rounded-lg border border-[#858585] px-4 py-3 text-sm text-black outline-none placeholder:text-[#858585] focus:border-[#9C2327]"
          />

          {/* Postal Code */}
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
            className="w-full rounded-lg border border-[#858585] px-4 py-3 text-sm text-black outline-none placeholder:text-[#858585] focus:border-[#9C2327]"
          />

          {/* Street Address */}
          <input
            type="text"
            placeholder="Street Name, Building, House No."
            value={streetAddress}
            onChange={(e) => setStreetAddress(e.target.value)}
            required
            className="w-full rounded-lg border border-[#858585] px-4 py-3 text-sm text-black outline-none placeholder:text-[#858585] focus:border-[#9C2327]"
          />

          {/* Form Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={saving}
              className="cursor-pointer rounded-lg bg-[#9C2327] px-6 py-3 font-semibold text-white transition hover:bg-[#7F1D20] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? "Saving..." : editingAddress ? "Save Changes" : "Add Address"}
            </button>

            <button
              type="button"
              onClick={handleCancel}
              disabled={saving}
              className="cursor-pointer rounded-lg border border-[#DBDBDB] px-6 py-3 font-semibold text-black transition hover:bg-[#F2F2F2] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          {/* Address List */}
          <div className="mt-8 space-y-4">
            {loading ? (
              <div className="rounded-xl border border-[#DBDBDB] p-10 text-center">
                <p className="text-sm text-[#858585]">Loading addresses...</p>
              </div>
            ) : addresses.length > 0 ? (
              addresses.map((address) => (
                <div key={address.id} className="rounded-xl border border-[#DBDBDB] p-6">
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                    {/* Address Information */}
                    <div className="text-sm text-black">
                      <div className="flex flex-wrap items-center gap-3">
                        <p className="font-semibold">{address.full_name}</p>

                        <span className="border-l border-[#DBDBDB] pl-3 text-[#858585]">
                          {address.phone_number}
                        </span>
                      </div>

                      <p className="mt-1 text-[#858585]">{address.street_address}</p>

                      <p className="text-[#858585]">
                        {address.location}, {address.postal_code}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex shrink-0 items-center gap-4">
                      <button
                        type="button"
                        onClick={() => handleEditAddress(address)}
                        className="cursor-pointer font-semibold text-[#9C2327] transition hover:opacity-70"
                      >
                        Edit
                      </button>

                      <span className="border-l-2 border-[#DBDBDB] pl-4 text-[#858585]">
                        <button
                          type="button"
                          onClick={() => setDeleteAddress(address)}
                          className="cursor-pointer font-semibold text-[#9C2327] transition hover:opacity-70"
                        >
                          Delete
                        </button>
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-xl border border-[#DBDBDB] p-10 text-center">
                <p className="text-sm text-[#858585]">No delivery address added yet.</p>
              </div>
            )}
          </div>
        </>
      )}

      {/* Delete Confirmation Modal */}
      {deleteAddress && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6">
            <h3 className="text-lg font-bold text-black">Delete Address?</h3>

            <p className="mt-2 text-sm text-[#858585]">
              Are you sure you want to delete this address? This action cannot be undone.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteAddress(null)}
                disabled={deleting}
                className="cursor-pointer rounded-lg border border-[#DBDBDB] px-5 py-3 font-semibold text-black transition hover:bg-[#F2F2F2] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={deleting}
                className="cursor-pointer rounded-lg bg-[#9C2327] px-5 py-3 font-semibold text-white transition hover:bg-[#7F1D20] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
