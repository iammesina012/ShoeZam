"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { FaChevronDown } from "react-icons/fa";

export default function NewBalance() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from("products").select("*").eq("brand", "New Balance");

      if (error) {
        alert(error.message);
      } else {
        setProducts(data);
      }
    };

    fetchProducts();
  }, []);

  const [selectedPrice, setSelectedPrice] = useState("");

  const filteredProducts = products.filter((product) => {
    let matchesPrice = true;
    if (selectedPrice === "under-2000") matchesPrice = product.price < 2000;
    if (selectedPrice === "2000-5000") matchesPrice = product.price >= 2000 && product.price <= 5000;
    if (selectedPrice === "5000-10000") matchesPrice = product.price >= 5000 && product.price <= 10000;
    if (selectedPrice === "10000-30000") matchesPrice = product.price >= 10000 && product.price <= 30000;
    if (selectedPrice === "30000-60000") matchesPrice = product.price >= 30000 && product.price <= 60000;
    if (selectedPrice === "60000-100000") matchesPrice = product.price >= 60000 && product.price <= 100000;
    if (selectedPrice === "over-100000") matchesPrice = product.price > 100000;

    return matchesPrice;
  });

  const [sortBy, setSortBy] = useState("az");

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "za") return b.name.localeCompare(a.name);
    if (sortBy === "low-high") return Number(a.price) - Number(b.price);
    if (sortBy === "high-low") return Number(b.price) - Number(a.price);

    return a.name.localeCompare(b.name);
  });

  return (
    <div className="min-h-screen bg-[#F2F2F2]">
      <main>
        {/* Hero Banner */}
        <section>
          <div className="relative w-full h-80">
            <Image
              src="/heroes/new-balance-hero5.jpg"
              alt="A white shoe with red capital letter 'N' on it"
              fill
              className="object-cover object-[center_52%]"
            />
            <div className="absolute inset-0 bg-black/40" />
            <h1 className="absolute left-14 bottom-14 text-6xl font-bold text-white">New Balance</h1>
          </div>
        </section>

        {/* Search Filters */}
        <section className="mx-auto grid max-w-360 gap-6 py-6 lg:grid-cols-[240px_1fr]">
          <aside className="h-fit rounded-2xl bg-white p-6 text-black shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-bold">Search Filters</h2>

              <button
                type="button"
                onClick={() => setSelectedPrice("")}
                disabled={!selectedPrice}
                className={`text-sm font-semibold ${
                  selectedPrice ? "text-[#9C2327] hover:underline cursor-pointer" : "text-[#9A9A9A] cursor-not-allowed"
                }`}
              >
                Clear
              </button>
            </div>

            <label className="mb-2 block text-sm font-semibold">Price Range</label>

            <div className="relative">
              <select
                value={selectedPrice}
                onChange={(event) => setSelectedPrice(event.target.value)}
                className="w-full appearance-none rounded-lg border border-gray-300 bg-white p-3 text-sm cursor-pointer"
              >
                <option value="" disabled hidden>
                  Price
                </option>
                <option value="under-2000">Under ₱2,000</option>
                <option value="2000-5000">₱2,000 - ₱5,000</option>
                <option value="5000-10000">₱5,000 - ₱10,000</option>
                <option value="10000-30000">₱10,000 - ₱30,000</option>
                <option value="30000-60000">₱30,000 - ₱60,000</option>
                <option value="60000-100000">₱60,000 - ₱100,000</option>
                <option value="over-100000">Over ₱100,000</option>
              </select>
              <FaChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-black" />
            </div>
          </aside>

          {/* Brand name + No. of results found */}
          <div>
            <div className="mb-6 flex flex-col justify-between gap-4 rounded-2xl bg-white p-5 text-black shadow-sm sm:flex-row sm:items-center">
              <div>
                <h2 className="text-xl font-bold">New Balance</h2>
                <p className="mt-1 text-sm text-gray-500">{filteredProducts.length} products found</p>
              </div>

              {/* Sort by */}
              <label className="flex items-center gap-3 text-sm font-semibold">
                Sort by
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(event) => setSortBy(event.target.value)}
                    className="w-44 appearance-none rounded-lg border border-gray-300 bg-white p-2 font-normal cursor-pointer"
                  >
                    <option value="az">A-Z</option>
                    <option value="za">Z-A</option>
                    <option value="low-high">Price: Low to High</option>
                    <option value="high-low">Price: High to Low</option>
                  </select>
                  <FaChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-black" />
                </div>
              </label>
            </div>

            {/* Product Catalog */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {sortedProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="rounded-2xl bg-white p-5 text-black shadow-sm transition hover:-translate-y-1 hover:shadow-lg cursor-pointer"
                >
                  <div className="relative h-56 w-full overflow-hidden">
                    <Image src={product.image_url} alt={product.name} fill className="object-contain" />
                  </div>

                  <p className="mt-4 min-h-12 line-clamp-2 text-sm font-bold">{product.name}</p>

                  <p className="mt-2 text-lg font-bold text-[#9C2327]">
                    ₱
                    {Number(product.price).toLocaleString("en-PH", {
                      minimumFractionDigits: 2,
                    })}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
