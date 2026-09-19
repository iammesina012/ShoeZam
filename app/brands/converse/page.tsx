"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { FaSearch, FaShoppingBag, FaUser } from "react-icons/fa";

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from("products").select("*").eq("brand", "Converse");

      if (error) {
        alert(error.message);
      } else {
        setProducts(data);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-[#F2F2F2]">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center gap-12 bg-black px-10 py-5">
        <Link href="/">
          <Image src="/shoezam-logo.png" alt="ShoeZam logo" width={90} height={90} className="cursor-pointer" />
        </Link>
        <div className="relative flex-1">
          <input type="text" placeholder="Search your shoes..." className="w-full rounded-lg border p-3" />
          <FaSearch className="absolute right-5 top-1/2 -translate-y-1/2" />
        </div>
        <div className="flex items-center gap-8 text-2xl text-white">
          <FaShoppingBag className="cursor-pointer" />
          <FaUser className="cursor-pointer" />
        </div>
      </header>

      <main>
        {/* Hero Banner */}
        <section>
          <div className="relative w-full h-80">
            <Image
              src="/converse-hero4.jpg"
              alt="A blue shoe with white lace against a red background."
              fill
              className="object-cover object-[center_50%]"
            />
            <div className="absolute inset-0 bg-black/40" />
            <h1 className="absolute left-14 bottom-14 text-6xl font-bold text-white">Converse</h1>
          </div>
        </section>

        {/* Search Filters + Sort By + Product Catalog */}
        <section className="flex p-4 gap-4">
          <div className="w-56 p-4 rounded-lg shadow-sm bg-white text-black">Search Filters</div>

          <div className="flex-1 flex flex-col gap-4">
            <div className="flex items-center gap-4 p-4 rounded-lg shadow-sm bg-white text-black">
              <span>Sort by</span>
              <select className="border rounded-lg p-2 cursor-pointer">
                <option value="az">A-Z</option>
                <option value="za">Z-A</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
              </select>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {products.map((product) => (
                <div key={product.id} className="p-8 bg-white rounded-lg text-black shadow-sm cursor-pointer">
                  <div className="w-full h-50 relative">
                    <Image src={product.image_url} alt={product.name} fill className="object-contain" />
                  </div>
                  <p className="text-sm font-bold text-black mt-2 line-clamp-2">{product.name}</p>
                  <p className="text-base font-bold text-[#9C2327] mt-1">₱{product.price.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
