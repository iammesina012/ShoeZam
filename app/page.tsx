"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { FaChevronDown, FaTimes, FaFilter, FaSlidersH } from "react-icons/fa";

export default function Home() {
  const brands = [
    { name: "Adidas", href: "/brands/adidas", logo: "/logos/adidas-logo.png" },
    { name: "Converse", href: "/brands/converse", logo: "/logos/converse-logo.png" },
    { name: "New Balance", href: "/brands/new-balance", logo: "/logos/newbalance-logo.png" },
    { name: "Nike", href: "/brands/nike", logo: "/logos/nike-logo.png" },
    { name: "Vans", href: "/brands/vans", logo: "/logos/vans-logo.png" },
  ];

  const [products, setProducts] = useState<any[]>([]);
  const [filtersOpen, setFiltersOpen] = useState(false);

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
    if (selectedPrice === "2000-5000")
      matchesPrice = product.price >= 2000 && product.price <= 5000;
    if (selectedPrice === "5000-10000")
      matchesPrice = product.price >= 5000 && product.price <= 10000;
    if (selectedPrice === "10000-30000")
      matchesPrice = product.price >= 10000 && product.price <= 30000;
    if (selectedPrice === "30000-60000")
      matchesPrice = product.price >= 30000 && product.price <= 60000;
    if (selectedPrice === "60000-100000")
      matchesPrice = product.price >= 60000 && product.price <= 100000;
    if (selectedPrice === "over-100000") matchesPrice = product.price > 100000;

    return matchesBrand && matchesPrice;
  });

  const [sortBy, setSortBy] = useState("");

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "za") return b.name.localeCompare(a.name);
    if (sortBy === "low-high") return Number(a.price) - Number(b.price);
    if (sortBy === "high-low") return Number(b.price) - Number(a.price);

    return a.name.localeCompare(b.name);
  });

  return (
    <div className="min-h-screen bg-[#F2F2F2] py-8">
      <main>
        {/* Hero Banner */}

        <section>
          <div className="grid rounded-3xl bg-white p-6 shadow-sm lg:p-10 lg:grid-cols-2">
            {/* Hero Text */}
            <div className="max-w-xl justify-self-center text-center lg:justify-self-start lg:text-left">
              <p className="text-2xl font-bold text-[#9C2327]">NEW ARRIVAL!</p>

              <h1 className="mt-4 text-3xl font-bold text-black sm:text-4xl lg:text-5xl">
                Vans Old Skool LX Comme Des Garcons
              </h1>

              <p className="mt-4 text-base text-[#858585]">
                Features a predominantly black upper made of canvas with suede detailing on the
                toebox, eyestays, and heel.
              </p>
            </div>

            {/* Red Circle + Shoe */}
            <div className="relative flex items-center justify-center lg:row-span-2 lg:col-start-2">
              <div className="absolute h-52 w-52 mt-4 rounded-full bg-[#9C2327] sm:h-58 sm:w-58 lg:h-64 lg:w-64" />

              <Image
                src="/products/vans/vans-old-skool-lx-comme-des-garcons-black.png"
                alt="Vans Black and White Sneakers"
                width={360}
                height={360}
                className="h-64 w-64 -translate-x-4 -translate-y-8 scale-x-[-1] -rotate-28 object-contain sm:h-72 sm:w-72 lg:h-auto lg:w-auto lg:-translate-x-8 lg:-translate-y-8"
              />
            </div>

            {/* View Product */}
            <div className="mt-4 justify-self-center lg:col-start-1 lg:row-start-2 lg:justify-self-start">
              <button
                type="button"
                className="rounded-full bg-black px-10 py-4 text-lg text-white cursor-pointer"
              >
                View product
              </button>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------------------------------------------- */}

        {/* Shop by Brand */}

        <section className="mt-12">
          <div className="flex flex-col items-center">
            <h2 className="font-bold text-5xl text-black">
              Shop by
              <span className="text-[#9C2327]"> Brand</span>
            </h2>
            <p className="mt-4 text-xl text-[#858585]">
              Explore your favorite footwear brands, all in one place.
            </p>
          </div>

          {/* Brand Cards */}

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
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

        {/* ----------------------------------------------------------------------------------------------- */}

        {/* Step Into Something New */}

        <section className="mt-12">
          <div className="flex flex-col items-center">
            <h1 className="text-5xl font-bold text-black">
              Step Into Something
              <span className="text-[#9C2327]"> New</span>
            </h1>
            <p className="mt-4 text-xl text-[#858585]">
              Browse our full collection and find the perfect pair for every step.
            </p>
          </div>

          {/* Filters + Sort */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {/* Filters */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setFiltersOpen(!filtersOpen)}
                className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-black shadow-sm cursor-pointer"
              >
                <FaFilter />
                <span>Filters</span>

                <FaChevronDown
                  className={`text-sm transition-transform ${filtersOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* Filter Panel */}
              {filtersOpen && (
                <div className="absolute left-0 top-full z-40 mt-3 w-72 rounded-2xl bg-white p-5 shadow-lg">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-black">Filters</h2>

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedBrand("");
                        setSelectedPrice("");
                      }}
                      disabled={!selectedBrand && !selectedPrice}
                      className={`text-sm font-semibold ${
                        selectedBrand || selectedPrice
                          ? "text-[#9C2327] hover:underline cursor-pointer"
                          : "text-[#9A9A9A] cursor-not-allowed"
                      }`}
                    >
                      Reset
                    </button>
                  </div>

                  <div className="my-4 border-t border-gray-200" />

                  {/* Brand */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-black">Brand</label>

                    <div className="relative">
                      <select
                        value={selectedBrand}
                        onChange={(e) => setSelectedBrand(e.target.value)}
                        className="w-full appearance-none rounded-lg border border-gray-300 bg-white p-2 pr-9 font-normal text-black cursor-pointer"
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
                  </div>

                  {/* Price Range */}
                  <div className="mt-4">
                    <label className="mb-2 block text-sm font-semibold text-black">
                      Price Range
                    </label>

                    <div className="relative">
                      <select
                        value={selectedPrice}
                        onChange={(e) => setSelectedPrice(e.target.value)}
                        className="w-full appearance-none rounded-lg border border-gray-300 bg-white p-2 pr-9 font-normal text-black cursor-pointer"
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

                  {/* Color */}
                  <div className="mt-4">
                    <label className="mb-2 block text-sm font-semibold text-black">Color</label>

                    <div className="relative">
                      <select
                        disabled
                        className="w-full appearance-none rounded-lg border border-gray-300 bg-white p-2 pr-9 font-normal text-[#858585] cursor-not-allowed"
                      >
                        <option>Color</option>
                      </select>

                      <FaChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#858585]" />
                    </div>
                  </div>

                  {/* Size */}
                  <div className="mt-4">
                    <label className="mb-2 block text-sm font-semibold text-black">Size</label>

                    <div className="relative">
                      <select
                        disabled
                        className="w-full appearance-none rounded-lg border border-gray-300 bg-white p-2 pr-9 font-normal text-[#858585] cursor-not-allowed"
                      >
                        <option>Size</option>
                      </select>

                      <FaChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#858585]" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sort By */}
            <div className="relative">
              <div className="flex items-center rounded-lg bg-white shadow-sm">
                <FaSlidersH className="ml-3 text-black" />

                <select
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value)}
                  className="appearance-none bg-transparent p-2 pr-9 font-normal text-black cursor-pointer outline-none"
                >
                  <option value="" disabled hidden>
                    Sort By
                  </option>
                  <option value="az">A-Z</option>
                  <option value="za">Z-A</option>
                  <option value="low-high">Price: Low to High</option>
                  <option value="high-low">Price: High to Low</option>
                </select>

                <FaChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-black" />
              </div>
            </div>
          </div>

          {/* Product Catalog */}

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sortedProducts.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="rounded-2xl bg-white p-5 text-black shadow-sm transition hover:-translate-y-1 hover:shadow-lg cursor-pointer"
              >
                <div className="relative h-56 w-full">
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    fill
                    className="object-contain"
                  />
                </div>

                <p className="mt-4 min-h-12 line-clamp-2 text-sm font-bold">{product.name}</p>

                <p className="mt-2 font-semibold text-[#9C2327]">
                  ₱
                  {Number(product.price).toLocaleString("en-PH", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
