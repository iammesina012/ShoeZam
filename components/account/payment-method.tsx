"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function PaymentMethodTab() {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentType, setPaymentType] = useState("card");
  const [editingPayment, setEditingPayment] = useState<string | null>(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [paymentToDelete, setPaymentToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [paymentMethods, setPaymentMethods] = useState<
    {
      id: string;
      type: "card" | "gcash";
      last4?: string;
      expiry?: string;
      name?: string;
      phone?: string;
    }[]
  >([]);

  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cardName, setCardName] = useState("");
  const [gcashNumber, setGcashNumber] = useState("");

  useEffect(() => {
    const loadPaymentMethods = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from("payment_methods")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error loading payment methods:", error);
        return;
      }

      setPaymentMethods(data);
    };

    loadPaymentMethods();
  }, []);

  const handleAddPayment = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    if (paymentType === "card") {
      const cleanCardNumber = cardNumber.replace(/\s/g, "");

      if (!cleanCardNumber || !expiryDate || !cardName) {
        return;
      }

      // EDIT
      if (editingPayment) {
        const { data, error } = await supabase
          .from("payment_methods")
          .update({
            type: "card",
            last4: cleanCardNumber.slice(-4),
            expiry: expiryDate,
            name: cardName,
          })
          .eq("id", editingPayment)
          .eq("user_id", user.id)
          .select()
          .single();

        if (error) {
          console.error("Error updating card:", error);
          return;
        }

        setPaymentMethods((current) =>
          current.map((payment) => (payment.id === editingPayment ? data : payment)),
        );
      }

      // ADD
      else {
        const { data, error } = await supabase
          .from("payment_methods")
          .insert({
            user_id: user.id,
            type: "card",
            last4: cleanCardNumber.slice(-4),
            expiry: expiryDate,
            name: cardName,
          })
          .select()
          .single();

        if (error) {
          console.error("Error adding card:", error);
          return;
        }

        setPaymentMethods((current) => [...current, data]);
      }
    }

    if (paymentType === "gcash") {
      if (!gcashNumber) {
        return;
      }

      // EDIT
      if (editingPayment) {
        const { data, error } = await supabase
          .from("payment_methods")
          .update({
            type: "gcash",
            phone: gcashNumber,
          })
          .eq("id", editingPayment)
          .eq("user_id", user.id)
          .select()
          .single();

        if (error) {
          console.error("Error updating GCash:", error);
          return;
        }

        setPaymentMethods((current) =>
          current.map((payment) => (payment.id === editingPayment ? data : payment)),
        );
      }

      // ADD
      else {
        const { data, error } = await supabase
          .from("payment_methods")
          .insert({
            user_id: user.id,
            type: "gcash",
            phone: gcashNumber,
          })
          .select()
          .single();

        if (error) {
          console.error("Error adding GCash:", error);
          return;
        }

        setPaymentMethods((current) => [...current, data]);
      }
    }

    setShowPaymentModal(false);
    setEditingPayment(null);

    setCardNumber("");
    setExpiryDate("");
    setCardName("");
    setGcashNumber("");
  };

  const handleDeletePayment = async (id: string) => {
    setIsDeleting(true);

    const { error } = await supabase.from("payment_methods").delete().eq("id", id);

    if (error) {
      console.error("Error deleting payment method:", error);
      setIsDeleting(false);
      return;
    }

    setPaymentMethods((current) => current.filter((payment) => payment.id !== id));

    setIsDeleting(false);
    setShowDeleteModal(false);
    setPaymentToDelete(null);
  };

  return (
    <div>
      {/* E-Wallets & Cards */}
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-black">E-Wallets & Cards</h2>

          <p className="mt-1 text-sm text-[#858585]">Manage your saved payment methods.</p>
        </div>

        <button
          type="button"
          onClick={() => {
            setEditingPayment(null);

            setPaymentType("card");
            setCardNumber("");
            setExpiryDate("");
            setCardName("");
            setGcashNumber("");

            setShowPaymentModal(true);
          }}
          className="w-fit rounded-lg bg-[#9C2327] px-5 py-3 font-semibold text-white transition hover:bg-[#7F1D20] cursor-pointer"
        >
          + Add Payment Method
        </button>
      </div>

      {/* Payment Methods */}
      <div className="mt-8">
        <h3 className="text-sm font-semibold text-black">Payment Methods</h3>

        {paymentMethods.length === 0 ? (
          <div className="mt-4 rounded-xl border border-[#DBDBDB] p-8 text-center">
            <p className="text-sm text-[#858585]">No saved payment methods yet.</p>

            <p className="mt-1 text-sm text-[#858585]">
              Add a payment method to make checkout faster and easier.
            </p>
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            {paymentMethods.map((payment) => (
              <div key={payment.id} className="rounded-xl border border-[#DBDBDB] p-6">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                  {/* Payment Information */}
                  <div className="text-sm text-black">
                    {payment.type === "card" ? (
                      <>
                        <p className="font-semibold">Credit / Debit Card</p>

                        <p className="mt-1 text-[#858585]">•••• •••• •••• {payment.last4}</p>

                        <p className="text-[#858585]">Expires {payment.expiry}</p>

                        <p className="text-[#858585]">{payment.name}</p>
                      </>
                    ) : (
                      <>
                        <p className="font-semibold">GCash</p>

                        <p className="mt-1 text-[#858585]">{payment.phone}</p>
                      </>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex shrink-0 items-center gap-4">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingPayment(payment.id);
                        setPaymentType(payment.type);

                        if (payment.type === "card") {
                          setCardNumber("");
                          setExpiryDate(payment.expiry || "");
                          setCardName(payment.name || "");
                          setGcashNumber("");
                        } else {
                          setGcashNumber(payment.phone || "");
                          setCardNumber("");
                          setExpiryDate("");
                          setCardName("");
                        }

                        setShowPaymentModal(true);
                      }}
                      className="font-semibold text-[#9C2327] transition hover:opacity-70 cursor-pointer"
                    >
                      Edit
                    </button>

                    <span className="border-l-2 border-[#DBDBDB] pl-4 text-[#858585]">
                      <button
                        type="button"
                        onClick={() => {
                          setPaymentToDelete(payment.id);
                          setShowDeleteModal(true);
                        }}
                        className="font-semibold text-[#9C2327] transition hover:opacity-70 cursor-pointer"
                      >
                        Delete
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Payment Method Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-xl bg-white shadow-lg">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <h3 className="text-lg font-semibold text-black">
                {editingPayment ? "Edit Payment Method" : "Add Payment Method"}
              </h3>

              <button
                type="button"
                onClick={() => setShowPaymentModal(false)}
                className="text-3xl font-light text-[#858585] cursor-pointer"
              >
                ×
              </button>
            </div>

            {/* Modal Content */}
            <div className="px-6 py-6">
              <p className="text-sm font-semibold text-black">Payment Method</p>

              {/* Payment Type */}
              <div className="mt-4 flex flex-col gap-4">
                <label className="flex items-center gap-3 text-sm text-black">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={paymentType === "card"}
                    onChange={() => setPaymentType("card")}
                    className="accent-[#9C2327]"
                  />
                  Credit / Debit Card
                </label>

                <label className="flex items-center gap-3 text-sm text-black">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="gcash"
                    checked={paymentType === "gcash"}
                    onChange={() => setPaymentType("gcash")}
                    className="accent-[#9C2327]"
                  />
                  GCash
                </label>
              </div>

              {/* GCash Form */}
              {paymentType === "gcash" && (
                <div className="mt-6">
                  <label className="mb-2 block text-sm font-semibold text-black">
                    Mobile Number
                  </label>

                  <input
                    type="tel"
                    value={gcashNumber}
                    onChange={(e) => setGcashNumber(e.target.value)}
                    placeholder="09XXXXXXXXX"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition placeholder:text-[#858585] text-black focus:border-[#9C2327]"
                  />
                </div>
              )}

              {/* Card Form */}
              {paymentType === "card" && (
                <div className="mt-6 space-y-5">
                  {/* Card Number */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-black">
                      Card Number
                    </label>

                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="0000 0000 0000 0000"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition placeholder:text-[#858585] text-black focus:border-[#9C2327]"
                    />
                  </div>

                  {/* Expiry Date + CVV */}
                  <div className="grid grid-cols-2 gap-4">
                    {/* Expiry Date */}
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-black">
                        Expiry Date
                      </label>

                      <input
                        type="text"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        placeholder="MM/YY"
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition placeholder:text-[#858585] text-black focus:border-[#9C2327]"
                      />
                    </div>

                    {/* CVV */}
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-black">CVV</label>

                      <input
                        type="password"
                        placeholder="CVV"
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition placeholder:text-[#858585] text-black focus:border-[#9C2327]"
                      />
                    </div>
                  </div>

                  {/* Name on Card */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-black">
                      Name on Card
                    </label>

                    <input
                      type="text"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      placeholder="Name on Card"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition placeholder:text-[#858585] text-black focus:border-[#9C2327]"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Modal Buttons */}
            <div className="flex justify-end gap-3 border-t border-gray-200 p-6">
              <button
                type="button"
                onClick={() => setShowPaymentModal(false)}
                className="rounded-lg border border-gray-300 px-5 py-3 font-semibold text-black transition hover:bg-[#F2F2F2] cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleAddPayment}
                className="rounded-lg bg-[#9C2327] px-5 py-3 font-semibold text-white transition hover:bg-[#7F1D20] cursor-pointer"
              >
                {editingPayment ? "Save Changes" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
            <h2 className="text-lg font-semibold text-black">Delete Payment Method?</h2>

            <p className="mt-2 text-sm text-[#858585]">
              Are you sure you want to delete this payment method?
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowDeleteModal(false);
                  setPaymentToDelete(null);
                }}
                disabled={isDeleting}
                className="cursor-pointer rounded-lg border border-[#DBDBDB] px-5 py-3 font-semibold text-black transition hover:bg-[#F2F2F2] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => {
                  if (paymentToDelete) {
                    handleDeletePayment(paymentToDelete);
                  }
                }}
                disabled={isDeleting}
                className="cursor-pointer rounded-lg bg-[#9C2327] px-5 py-3 font-semibold text-white transition hover:bg-[#7F1D20] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
