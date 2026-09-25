"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

export default function ShoppingBag() {
  const [products, setProducts] = useState<any[] | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);

  useEffect(() => {
    const savedBag = localStorage.getItem("shoppingBag");

    if (savedBag) {
      const bag = JSON.parse(savedBag);

      const productsWithQuantity = bag.map((product: any) => ({
        ...product,
        quantity: product.quantity ?? 1,
      }));

      setProducts(productsWithQuantity);
    }
  }, []);

  useEffect(() => {
    if (products !== null) {
      localStorage.setItem("shoppingBag", JSON.stringify(products));
    }
  }, [products]);

  const groupedProducts = (products ?? []).reduce((groups: any, product: any) => {
    if (!groups[product.brand]) {
      groups[product.brand] = [];
    }

    groups[product.brand].push(product);

    return groups;
  }, {});

  const total = (products ?? [])
    .filter((product) => selectedProducts.includes(product.id))
    .reduce((sum, product) => sum + product.price * product.quantity, 0);

  return (
    <div className="min-h-screen bg-[#F2F2F2]">
      {/* Header */}
      <header className="flex items-center justify-between bg-black px-42 py-4">
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

          <h2 className="text-lg">Shopping Bag</h2>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Search your shoes..."
            className="w-146 rounded-lg border p-3"
          />
          <FaSearch className="absolute right-5 top-1/2 -translate-y-1/2" />
        </div>
      </header>

      {/* Main */}
      <main>
        {products && products.length > 0 && (
          <>
            {/* Columns */}
            <section className="w-full p-4 mt-4 bg-white">
              <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr] items-center justify-items-center">
                <div className="flex items-center gap-4 justify-self-start">
                  <input
                    type="checkbox"
                    className="ml-4 accent-black cursor-pointer"
                    checked={
                      (products ?? []).length > 0 &&
                      selectedProducts.length === (products ?? []).length
                    }
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedProducts((products ?? []).map((product) => product.id));
                      } else {
                        setSelectedProducts([]);
                      }
                    }}
                  />
                  <label className="text-sm text-black">Products</label>
                </div>

                <span className="text-[#858585] text-sm">Variation</span>
                <span className="text-[#858585] text-sm">Unit Price</span>
                <span className="text-[#858585] text-sm">Quantity</span>
                <span className="text-[#858585] text-sm">Total Price</span>
                <span className="text-[#858585] text-sm">Actions</span>
              </div>
            </section>

            {/* Products section */}
            <section className="w-full mt-4">
              {Object.entries(groupedProducts).map(([brand, brandProducts]: [string, any]) => (
                <section key={brand} className="w-full mb-4 bg-white">
                  {/* Brand header */}
                  <div className="p-4">
                    <div className="flex items-center gap-4">
                      <input
                        type="checkbox"
                        className="ml-4 accent-black cursor-pointer"
                        checked={brandProducts.every((product: any) =>
                          selectedProducts.includes(product.id),
                        )}
                        onChange={(e) => {
                          const brandProductIds = brandProducts.map((product: any) => product.id);

                          if (e.target.checked) {
                            setSelectedProducts((current) => [
                              ...new Set([...current, ...brandProductIds]),
                            ]);
                          } else {
                            setSelectedProducts((current) =>
                              current.filter((id) => !brandProductIds.includes(id)),
                            );
                          }
                        }}
                      />

                      <label className="text-sm text-black font-bold">{brand}</label>
                    </div>
                  </div>

                  <hr className="border-gray-200" />

                  {/* Products under this brand */}
                  {brandProducts.map((product: any) => (
                    <div
                      key={product.id}
                      className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr] items-center justify-items-center p-4"
                    >
                      {/* Product Image + Name */}
                      <div className="flex items-center gap-4 justify-self-start">
                        <input
                          type="checkbox"
                          className="ml-4 accent-black cursor-pointer"
                          checked={selectedProducts.includes(product.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedProducts((current) => [...current, product.id]);
                            } else {
                              setSelectedProducts((current) =>
                                current.filter((id) => id !== product.id),
                              );
                            }
                          }}
                        />

                        <Image
                          src={product.image_url}
                          alt={product.name}
                          width={100}
                          height={100}
                        />

                        <span className="w-66 text-sm text-black">{product.name}</span>
                      </div>

                      {/* Variation */}
                      <span></span>

                      {/* Unit Price */}
                      <span className="text-black text-sm">
                        ₱
                        {product.price.toLocaleString("en-PH", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>

                      {/* Quantity */}
                      <div className="flex w-fit items-center gap-8 rounded-lg border px-4 py-2 text-black">
                        <button
                          type="button"
                          className="cursor-pointer text-xl leading-none"
                          onClick={() => {
                            setProducts((current) =>
                              (current ?? []).map((item) =>
                                item.id === product.id && item.quantity > 1
                                  ? { ...item, quantity: item.quantity - 1 }
                                  : item,
                              ),
                            );
                          }}
                        >
                          -
                        </button>

                        <span>{product.quantity}</span>

                        <button
                          type="button"
                          className="cursor-pointer text-xl leading-none"
                          onClick={() => {
                            setProducts((current) =>
                              (current ?? []).map((item) =>
                                item.id === product.id
                                  ? { ...item, quantity: item.quantity + 1 }
                                  : item,
                              ),
                            );
                          }}
                        >
                          +
                        </button>
                      </div>

                      {/* Total Price */}
                      <span className="text-[#9C2327] text-sm">
                        ₱
                        {(product.price * product.quantity).toLocaleString("en-PH", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>

                      {/* Actions */}
                      <div className="flex items-center gap-4 text-black text-sm">
                        <button
                          type="button"
                          className="cursor-pointer hover:text-[#9C2327] hover:underline"
                        >
                          Edit
                        </button>

                        <span>|</span>

                        <button
                          type="button"
                          className="cursor-pointer hover:text-[#9C2327] hover:underline"
                          onClick={() => {
                            setProducts((current) =>
                              (current ?? []).filter((item) => item.id !== product.id),
                            );

                            setSelectedProducts((current) =>
                              current.filter((id) => id !== product.id),
                            );
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </section>
              ))}
            </section>

            <section className="w-full mt-4 bg-white p-4">
              <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr] items-center justify-items-center">
                <span className="col-span-4"></span>

                {/* Total */}
                <span className="whitespace-nowrap text-sm text-black">
                  Total ({selectedProducts.length}{" "}
                  {selectedProducts.length === 1 ? "item" : "items"}):
                  <span className="ml-2 text-lg text-[#9C2327]">
                    ₱
                    {total.toLocaleString("en-PH", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </span>

                {/* Checkout */}
                <button
                  type="button"
                  disabled={selectedProducts.length === 0}
                  className="rounded-lg bg-[#9C2327] px-6 py-3 text-white cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Check out
                </button>
              </div>
            </section>
          </>
        )}

        {products && products.length === 0 && (
          <section className="flex min-h-100 w-full flex-col items-center justify-center">
            <p className="mb-4 text-lg text-black">Your shopping bag is empty.</p>

            <Link href="/" className="rounded-lg bg-[#9C2327] px-6 py-3 text-white cursor-pointer">
              Continue Shopping
            </Link>
          </section>
        )}
      </main>
    </div>
  );
}
