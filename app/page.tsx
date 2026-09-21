"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { FaSearch, FaShoppingBag, FaUser, FaChevronDown, FaTimes } from "react-icons/fa";

export default function Home() {
  const brands = [
    { name: "Adidas", href: "/brands/adidas", logo: "/logos/adidas-logo.png" },
    { name: "Converse", href: "/brands/converse", logo: "/logos/converse-logo.png" },
    { name: "New Balance", href: "/brands/new-balance", logo: "/logos/newbalance-logo.png" },
    { name: "Nike", href: "/brands/nike", logo: "/logos/nike-logo.png" },
    { name: "Vans", href: "/brands/vans", logo: "/logos/vans-logo.png" },
  ];

  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from("products").select("*");

      if (error) {
        alert(error.message);
      } else {
        setProducts(data);
      }
    };

    fetchProducts();
  }, []);

  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");

  const filteredProducts = products.filter((product) => {
    const matchesBrand = selectedBrand ? product.brand === selectedBrand : true;

    let matchesPrice = true;
    if (selectedPrice === "under-2000") matchesPrice = product.price < 2000;
    if (selectedPrice === "2000-5000") matchesPrice = product.price >= 2000 && product.price <= 5000;
    if (selectedPrice === "5000-10000") matchesPrice = product.price >= 5000 && product.price <= 10000;
    if (selectedPrice === "10000-30000") matchesPrice = product.price >= 10000 && product.price <= 30000;
    if (selectedPrice === "30000-60000") matchesPrice = product.price >= 30000 && product.price <= 60000;
    if (selectedPrice === "60000-100000") matchesPrice = product.price >= 60000 && product.price <= 100000;
    if (selectedPrice === "over-100000") matchesPrice = product.price > 100000;

    return matchesBrand && matchesPrice;
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
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center gap-12 bg-black px-10 py-5">
        <Link href="/">
          <Image src="/logos/shoezam-logo.png" alt="ShoeZam logo" width={90} height={90} className="cursor-pointer" />
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
        <section className="px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-360 items-center justify-between rounded-3xl bg-white px-8 py-12 shadow-sm lg:px-16 lg:py-20">
            {/* existing hero content */}
            {/* Text */}
            <div className="max-w-xl">
              <p className="text-3xl font-bold text-[#9C2327]">NEW ARRIVAL!</p>

              <h1 className="mt-4 text-5xl font-bold text-black">Vans Old Skool LX Comme Des Garcons</h1>

              <p className="mt-8 text-lg text-[#858585]">
                Features a predominantly black upper made of canvas with suede detailing on the toebox, eyestays, and
                heel.
              </p>

              <button type="button" className="mt-8 rounded-full bg-black px-10 py-4 text-lg text-white cursor-pointer">
                View product
              </button>
            </div>

            {/* Red circle + Shoe image */}
            <div className="relative flex items-center justify-center">
              <div className="absolute h-95 w-95 rounded-full bg-[#9C2327]" />

              <Image
                src="/products/vans/vans-old-skool-lx-comme-des-garcons-black.png"
                alt="Vans Black and White Sneakers"
                width={550}
                height={400}
                className="-translate-x-8 -translate-y-16 scale-x-[-1] -rotate-28 object-contain"
              />
            </div>
          </div>
        </section>

        <section className="mt-4">
          {/* Title + Subtitle */}
          <div className="flex flex-col items-center">
            <h2 className="font-bold text-5xl text-black">Shop by Brand</h2>
            <p className="mt-4 text-xl text-[#858585]">Explore your favorite footwear brands, all in one place.</p>
          </div>

          {/* Brand Cards */}
          <div className="mx-auto mt-8 grid max-w-360 grid-cols-2 gap-4 px-4 sm:grid-cols-3 sm:px-6 lg:grid-cols-5 lg:px-8">
            {brands.map((brand) => (
              <Link
                key={brand.name}
                href={brand.href}
                className="flex aspect-square items-center justify-center overflow-hidden rounded-3xl bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:p-10"
              >
                <Image
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  width={140}
                  height={140}
                  className="h-full w-full object-contain"
                />
              </Link>
            ))}
          </div>
        </section>

        {/* Title + Subtitle */}
        <section className="min-h-screen mt-12">
          <div className="flex flex-col items-center">
            <h1 className="text-5xl font-bold text-black">Step Into Something New</h1>
            <p className="mt-4 text-xl text-[#858585]">
              Browse our full collection and find the perfect pair for every step.
            </p>
          </div>

          {/* White Container */}
          <div className="mx-auto mt-8 flex max-w-360 flex-wrap items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <div className="flex flex-wrap items-center justify-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black shadow-sm">
                <span>Search Filter</span>

                {/* Brand Dropdown */}
                <div className="relative">
                  <select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    className="w-44 appearance-none rounded-lg border border-gray-300 bg-white p-2 pr-9 font-normal text-black cursor-pointer"
                  >
                    <option value="" disabled hidden>
                      Brand
                    </option>
                    <option value="Adidas">Adidas</option>
                    <option value="Converse">Converse</option>
                    <option value="New Balance">New Balance</option>
                    <option value="Nike">Nike</option>
                    <option value="Vans">Vans</option>
                  </select>
                  <FaChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-black" />
                </div>

                {/* Price Range Dropdown */}
                <div className="relative">
                  <select
                    value={selectedPrice}
                    onChange={(e) => setSelectedPrice(e.target.value)}
                    className="w-44 appearance-none rounded-lg border border-gray-300 bg-white p-2 pr-9 font-normal text-black cursor-pointer"
                  >
                    <option value="" disabled hidden>
                      Price Range
                    </option>
                    <option value="under-2000">Under ₱2,000</option>
                    <option value="2000-5000">₱2,000 - ₱5,000</option>
                    <option value="5000-10000">₱5,000 - ₱10,000</option>
                    <option value="10000-30000">₱10,000 - ₱30,000</option>
                    <option value="30000-60000">₱30,000 - ₱60,000</option>
                    <option value="60000-100000">₱60,000 - ₱100,000</option>
                    <option value="over-100000">Over ₱100,000</option>
                  </select>
                  <FaChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-black" />
                </div>
              </div>

              {/* Clear Filter button */}
              <button
                type="button"
                onClick={() => {
                  setSelectedBrand("");
                  setSelectedPrice("");
                }}
                disabled={!selectedBrand && !selectedPrice}
                className={`flex items-center gap-2 rounded-full border-2 px-5 py-3 font-bold transition ${
                  selectedBrand || selectedPrice
                    ? "border-[#9C2327] text-[#9C2327] hover:bg-[#9C2327] hover:text-white cursor-pointer"
                    : "border-[#D6D6D6] text-[#9A9A9A] cursor-not-allowed"
                }`}
              >
                <FaTimes className="text-sm" />
                Clear Filters
              </button>
            </div>

            <label className="flex items-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black shadow-sm">
              Sort by
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value)}
                  className="w-44 appearance-none rounded-lg border border-gray-300 bg-white p-2 pr-9 font-normal cursor-pointer"
                >
                  <option value="az">A-Z</option>
                  <option value="za">Z-A</option>
                  <option value="low-high">Price: Low to High</option>
                  <option value="high-low">Price: High to Low</option>
                </select>
                <FaChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-black" />
              </div>
            </label>
          </div>

          {/* Product Catalog */}
          <div className="mx-auto mt-8 grid max-w-360 grid-cols-1 gap-6 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
            {sortedProducts.map((product) => (
              <div
                key={product.id}
                className="rounded-2xl bg-white p-5 text-black shadow-sm transition hover:-translate-y-1 hover:shadow-lg cursor-pointer"
              >
                <div className="relative h-56 w-full">
                  <Image src={product.image_url} alt={product.name} fill className="object-contain" />
                </div>

                <p className="mt-4 min-h-12 line-clamp-2 text-sm font-bold">{product.name}</p>

                <p className="mt-2 text-lg font-bold text-[#9C2327]">
                  ₱
                  {Number(product.price).toLocaleString("en-PH", {
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
