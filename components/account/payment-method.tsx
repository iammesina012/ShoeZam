"use client";

import { useEffect, useState } from "react";

export default function PaymentMethodTab() {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentType, setPaymentType] = useState("card");

  const [paymentMethods, setPaymentMethods] = useState<
    {
      id: number;
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
    const savedPayments = localStorage.getItem("paymentMethods");

    if (savedPayments) {
      setPaymentMethods(JSON.parse(savedPayments));
    }
  }, []);

  const handleAddPayment = () => {
    if (paymentType === "card") {
      const cleanCardNumber = cardNumber.replace(/\s/g, "");

      if (!cleanCardNumber || !expiryDate || !cardName) {
        return;
      }

      const newPayment = {
        id: Date.now(),
        type: "card" as const,
        last4: cleanCardNumber.slice(-4),
        expiry: expiryDate,
        name: cardName,
      };

      const updatedPayments = [...paymentMethods, newPayment];

      setPaymentMethods(updatedPayments);
      localStorage.setItem("paymentMethods", JSON.stringify(updatedPayments));
    }

    if (paymentType === "gcash") {
      if (!gcashNumber) {
        return;
      }

      const newPayment = {
        id: Date.now(),
        type: "gcash" as const,
        phone: gcashNumber,
      };

      const updatedPayments = [...paymentMethods, newPayment];

      setPaymentMethods(updatedPayments);
      localStorage.setItem("paymentMethods", JSON.stringify(updatedPayments));
    }

    setShowPaymentModal(false);

    setCardNumber("");
    setExpiryDate("");
    setCardName("");
    setGcashNumber("");
  };

  const handleDeletePayment = (id: number) => {
    const updatedPayments = paymentMethods.filter((payment) => payment.id !== id);

    setPaymentMethods(updatedPayments);
    localStorage.setItem("paymentMethods", JSON.stringify(updatedPayments));
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
          onClick={() => setShowPaymentModal(true)}
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
                      className="font-semibold text-[#9C2327] transition hover:opacity-70 cursor-pointer"
                    >
                      Edit
                    </button>

                    <span className="border-l-2 border-[#DBDBDB] pl-4 text-[#858585]">
                      <button
                        type="button"
                        onClick={() => handleDeletePayment(payment.id)}
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
              <h3 className="text-lg font-semibold text-black">Add Payment Method</h3>

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
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
