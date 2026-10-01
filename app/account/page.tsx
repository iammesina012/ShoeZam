"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProfileTab from "@/components/account/profile";
import PasswordTab from "@/components/account/password";
import AddressesTab from "@/components/account/addresses";
import PaymentMethodTab from "@/components/account/payment-method";
import PrivacyTab from "@/components/account/privacy";
import OrdersTab from "@/components/account/orders";

export default function Account() {
  const searchParams = useSearchParams();

  const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "profile");

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
                onClick={() => setActiveTab("payment-method")}
                className={`border-b-2 px-4 py-4 text-sm font-semibold transition ${
                  activeTab === "wallets"
                    ? "border-[#9C2327] text-[#9C2327]"
                    : "border-transparent text-[#858585] hover:text-black"
                }`}
              >
                Payment Method
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
            {activeTab === "payment-method" && <PaymentMethodTab />}
            {activeTab === "privacy" && <PrivacyTab />}
            {activeTab === "orders" && <OrdersTab />}
          </div>
        </div>
      </main>
    </div>
  );
}
