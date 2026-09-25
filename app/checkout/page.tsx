"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [ewallet, setEwallet] = useState("");

  return (
    <div className="min-h-screen bg-[#F2F2F2]">
      <header className="flex items-center bg-black px-42 py-4">
        <div className="flex items-center gap-4 ">
          <Link href="/">
            <Image
              src="/logos/shoezam-logo.png"
              alt="ShoeZam logo"
              width={90}
              height={90}
              className="cursor-pointer"
            />
          </Link>

          <span className="text-3xl">|</span>

          <h2 className="text-lg">Checkout</h2>
        </div>
      </header>

      <main>
        <section className="w-full mt-4 p-8 bg-white">
          <div className="flex flex-col justify-center gap-4">
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-[#9C2327]" />
              <span className="text-[#9C2327] text-lg">Delivery Address</span>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="text-black font-semibold">
                Michael William Mesina (+63) 992 408 2292
              </span>
              <span className="text-black">
                Blk 6 Lot 13 St. Luke Drive, Palmera IV, Dolores (Pob.), Taytay, South Luzon, Rizal
                1920
              </span>
              <button type="button" className="ml-26 text-blue-500 font-semibold">
                Change
              </button>
            </div>
          </div>
        </section>

        <section className="w-full mt-4 p-8 bg-white">
          <div className="grid grid-cols-[1fr_150px_150px_150px_150px]">
            <span className="text-lg font-semibold text-black">Products Ordered</span>
            <span className="text-[#858585] text-sm">Variation</span>
            <span className="text-[#858585] text-sm">Unit Price</span>
            <span className="text-[#858585] text-sm">Quantity</span>
            <span className="text-[#858585] text-sm">Item Subtotal</span>
          </div>

          <div className="mt-8 ">
            <span className="text-black text-sm font-bold">Brand Name</span>
          </div>
          <hr className="mt-2 border-gray-200" />
        </section>

        <section className="w-full mt-4 bg-white p-8">
          <h2 className="text-lg font-semibold text-black">Payment Method</h2>

          <div className="mt-4 flex flex-col gap-4">
            {/* Cash on Delivery */}
            <label className="flex items-center gap-2 text-sm text-black cursor-pointer">
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={(e) => {
                  setPaymentMethod(e.target.value);
                  setEwallet("");
                }}
                className="accent-[#9C2327]"
              />
              Cash on Delivery
            </label>

            {/* E-Wallet */}
            <label className="flex items-center gap-2 text-sm text-black cursor-pointer">
              <input
                type="radio"
                name="paymentMethod"
                value="ewallet"
                checked={paymentMethod === "ewallet"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="accent-[#9C2327]"
              />
              E-Wallet
            </label>

            {/* E-Wallet Options */}
            {paymentMethod === "ewallet" && (
              <div className="ml-7 flex flex-col gap-4">
                <label className="flex items-center gap-2 text-sm text-black cursor-pointer">
                  <input
                    type="radio"
                    name="ewallet"
                    value="gcash"
                    checked={ewallet === "gcash"}
                    onChange={(e) => setEwallet(e.target.value)}
                    className="accent-[#9C2327]"
                  />
                  GCash
                </label>

                <label className="flex items-center gap-2 text-sm text-black cursor-pointer">
                  <input
                    type="radio"
                    name="ewallet"
                    value="maya"
                    checked={ewallet === "maya"}
                    onChange={(e) => setEwallet(e.target.value)}
                    className="accent-[#9C2327]"
                  />
                  Maya
                </label>
              </div>
            )}
          </div>
        </section>

        <section className="w-full mt-4 my-4 bg-white p-4">
          <div className="flex items-center justify-end gap-8">
            <span className="whitespace-nowrap text-sm text-black">
              Total:
              <span className="ml-2 text-lg text-[#9C2327]">₱0.00</span>
            </span>

            <button
              type="button"
              className="rounded-lg bg-[#9C2327] px-6 py-3 text-white cursor-pointer"
            >
              Place Order
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
