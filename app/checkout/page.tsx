"use client";

import Image from "next/image";
import Link from "next/link";
import AddressModal from "../../components/address-modal";
import { useEffect, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function Checkout() {
  const [products, setProducts] = useState<any[]>([]);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [ewallet, setEwallet] = useState("");
  const [total, setTotal] = useState(0);
  const [showAddressModal, setShowAddressModal] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem("checkoutData");

    if (savedData) {
      const checkoutData = JSON.parse(savedData);

      setProducts(checkoutData.products);
      setTotal(checkoutData.total);
    }
  }, []);

  const groupedProducts = products.reduce((groups: any, product: any) => {
    if (!groups[product.brand]) {
      groups[product.brand] = [];
    }

    groups[product.brand].push(product);

    return groups;
  }, {});

  return (
    // Header
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
        {/* Delivery Address */}
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
              <button
                type="button"
                onClick={() => setShowAddressModal(true)}
                className="ml-26 text-blue-500 font-semibold cursor-pointer"
              >
                Change
              </button>
            </div>
          </div>
        </section>

        {/* Products Ordered */}
        <section className="w-full mt-4 p-8 bg-white">
          <div className="grid grid-cols-[1fr_150px_150px_150px_150px] items-center justify-items-center">
            <span className="text-lg font-semibold text-black justify-self-start">
              Products Ordered
            </span>
            <span className="text-[#858585] text-sm">Variation</span>
            <span className="text-[#858585] text-sm">Unit Price</span>
            <span className="text-[#858585] text-sm">Quantity</span>
            <span className="text-[#858585] text-sm">Item Subtotal</span>
          </div>

          <div className="mt-8">
            {Object.entries(groupedProducts).map(([brand, brandProducts]: [string, any]) => (
              <div key={brand} className="mt-4 first:mt-0">
                <span className="text-black text-sm font-bold">{brand}</span>

                <hr className="mt-2 border-gray-200" />

                {brandProducts.map((product: any) => (
                  <div
                    key={product.id}
                    className="mt-2 grid grid-cols-[1fr_150px_150px_150px_150px] items-center justify-items-center"
                  >
                    {/* Product Image + Product Name */}
                    <div className="flex items-center gap-4 justify-self-start">
                      <Image src={product.image_url} alt={product.name} width={80} height={80} />

                      <span className="text-sm text-black">{product.name}</span>
                    </div>

                    {/* Variation */}
                    <span className="text-sm text-black">-</span>

                    {/* Unit Price */}
                    <span className="text-sm text-black">
                      ₱
                      {product.price.toLocaleString("en-PH", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>

                    {/* Quantity */}
                    <span className="text-sm text-black">{product.quantity}</span>

                    {/* Item Subtotal */}
                    <span className="text-sm text-black">
                      ₱
                      {product.subtotal.toLocaleString("en-PH", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* Payment Method */}
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

        {/* Total + Place Order button */}
        <section className="w-full mt-4 my-4 bg-white p-4">
          <div className="flex items-center justify-end gap-8">
            <span className="whitespace-nowrap text-sm text-black">
              Total:
              <span className="ml-2 text-lg text-[#9C2327]">
                ₱
                {total.toLocaleString("en-PH", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </span>

            <button
              type="button"
              className="rounded-lg bg-[#9C2327] px-6 py-3 text-white cursor-pointer"
            >
              Place Order
            </button>

            {showAddressModal && <AddressModal onClose={() => setShowAddressModal(false)} />}
          </div>
        </section>
      </main>
    </div>
  );
}
