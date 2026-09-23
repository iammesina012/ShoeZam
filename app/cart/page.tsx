"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { FaSearch, FaShoppingBag, FaUser } from "react-icons/fa";

export default function ShoppingBag() {
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    const savedProduct = localStorage.getItem("shoppingBag");

    if (savedProduct) {
      const product = JSON.parse(savedProduct);

      setProduct(product);
    }
  }, []);
  return (
    <div className="min-h-screen bg-[#F2F2F2]">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between gap-12 bg-black p-4 sm:gap-8 sm:py-4 lg:px-56">
        <div className="flex items-center gap-4 ">
          <Link href="/">
            <Image src="/logos/shoezam-logo.png" alt="ShoeZam logo" width={90} height={90} className="cursor-pointer" />
          </Link>

          <span className="text-3xl">|</span>

          <h2 className="text-lg">Shopping Bag</h2>
        </div>

        <div className="relative">
          <input type="text" placeholder="Search your shoes..." className="w-146 rounded-lg border p-3" />
          <FaSearch className="absolute right-5 top-1/2 -translate-y-1/2" />
        </div>
      </header>

      {/* Main */}
      <main>
        <section className="w-full p-4 mt-8 bg-white">
          <div className="grid grid-cols-[1fr_150px_150px_150px_150px] items-center">
            <div className="flex items-center gap-4">
              <input type="checkbox" className="ml-4 accent-black cursor-pointer" />
              <label className="text-sm text-black">Products</label>
            </div>

            <span className="text-[#858585] text-sm">Unit Price</span>
            <span className="text-[#858585] text-sm">Quantity</span>
            <span className="text-[#858585] text-sm">Total Price</span>
            <span className="text-[#858585] text-sm">Actions</span>
          </div>
        </section>

        <section className="w-full p-4 mt-4 bg-white">
          <div className="flex items-center gap-4">
            <input type="checkbox" className="ml-4 accent-black cursor-pointer" />
            <label className="text-sm text-black">Brand name</label>
          </div>

          <hr className="-mx-4 mt-4 border-gray-200" />

          <p className="text-black">{product?.name}</p>
        </section>
      </main>
    </div>
  );
}
