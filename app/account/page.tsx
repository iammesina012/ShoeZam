"use client";

import { useEffect, useState } from "react";
import ProfileTab from "@/components/account/profile";
import PasswordTab from "@/components/account/password";
import AddressesTab from "@/components/account/addresses";
import PaymentMethodsTab from "@/components/account/payment-methods";
import PrivacyTab from "@/components/account/privacy";

export default function Account() {
  const [activeTab, setActiveTab] = useState("profile");
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
    <div className="min-h-screen bg-[#F2F2F2] py-8">
      <main>
        <div className="rounded-2xl bg-white shadow-sm">
          {/* Page Header */}
          <div className="border-b border-gray-200 p-6">
            <h1 className="text-2xl font-bold text-black">My Account</h1>
          </div>

          {/* Tabs */}
          <div className="overflow-x-auto border-b border-gray-200">
            <div className="flex min-w-max px-6 sm:px-8">
              {/* Profile */}
              <button
                type="button"
                onClick={() => setActiveTab("profile")}
                className={`border-b-2 px-4 py-4 text-sm font-semibold transition ${
                  activeTab === "profile"
                    ? "border-[#9C2327] text-[#9C2327]"
                    : "border-transparent text-[#858585] hover:text-black"
                }`}
              >
                Profile
              </button>

              {/* Change Password */}
              <button
                type="button"
                onClick={() => setActiveTab("password")}
                className={`border-b-2 px-4 py-4 text-sm font-semibold transition ${
                  activeTab === "password"
                    ? "border-[#9C2327] text-[#9C2327]"
                    : "border-transparent text-[#858585] hover:text-black"
                }`}
              >
                Change Password
              </button>

              {/* Addresses */}
              <button
                type="button"
                onClick={() => setActiveTab("addresses")}
                className={`border-b-2 px-4 py-4 text-sm font-semibold transition ${
                  activeTab === "addresses"
                    ? "border-[#9C2327] text-[#9C2327]"
                    : "border-transparent text-[#858585] hover:text-black"
                }`}
              >
                Addresses
              </button>

              {/* E-Wallets & Cards */}
              <button
                type="button"
                onClick={() => setActiveTab("wallets")}
                className={`border-b-2 px-4 py-4 text-sm font-semibold transition ${
                  activeTab === "wallets"
                    ? "border-[#9C2327] text-[#9C2327]"
                    : "border-transparent text-[#858585] hover:text-black"
                }`}
              >
                E-Wallets & Cards
              </button>

              {/* Privacy */}
              <button
                type="button"
                onClick={() => setActiveTab("privacy")}
                className={`border-b-2 px-4 py-4 text-sm font-semibold transition ${
                  activeTab === "privacy"
                    ? "border-[#9C2327] text-[#9C2327]"
                    : "border-transparent text-[#858585] hover:text-black"
                }`}
              >
                Privacy
              </button>

              <span className="flex items-center px-4 text-2xl text-[#DBDBDB]">|</span>

              {/* Orders */}
              <button
                type="button"
                onClick={() => setActiveTab("orders")}
                className={`border-b-2 px-4 py-4 text-sm font-semibold transition ${
                  activeTab === "orders"
                    ? "border-[#9C2327] text-[#9C2327]"
                    : "border-transparent text-[#858585] hover:text-black"
                }`}
              >
                Orders
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 sm:px-8 lg:px-12">
            {activeTab === "profile" && <ProfileTab />}
            {activeTab === "password" && <PasswordTab />}
            {activeTab === "addresses" && <AddressesTab />}
            {activeTab === "payment-methods" && <PaymentMethodsTab />}
            {activeTab === "privacy" && <PrivacyTab />}

            {/* Orders */}
            {activeTab === "orders" && (
              <div>
                <h2 className="text-xl font-bold text-black">My Orders</h2>

                <p className="mt-1 text-sm text-[#858585]">Track and manage your orders.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
