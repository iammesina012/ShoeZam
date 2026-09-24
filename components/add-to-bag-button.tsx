"use client";

import { useState } from "react";
import { FaShoppingBag } from "react-icons/fa";

type AddToBagButtonProps = {
  product: any;
};

export default function AddToBagButton({ product }: AddToBagButtonProps) {
  const [added, setAdded] = useState(false);

  return (
    <>
      <button
        type="button"
        className="mt-6 flex max-w-sm items-center justify-center gap-3 rounded-xl bg-[#9C2327] px-6 py-5 text-lg font-bold cursor-pointer"
        onClick={() => {
          const savedBag = localStorage.getItem("shoppingBag");

          const bag = savedBag ? JSON.parse(savedBag) : [];

          const existingProduct = bag.find((item: any) => item.id === product.id);

          if (existingProduct) {
            existingProduct.quantity = (existingProduct.quantity ?? 1) + 1;
          } else {
            bag.unshift({
              ...product,
              quantity: 1,
            });
          }

          localStorage.setItem("shoppingBag", JSON.stringify(bag));

          setAdded(true);

          setTimeout(() => {
            setAdded(false);
          }, 2000);
        }}
      >
        <FaShoppingBag className="text-xl" />
        Add to Bag
      </button>

      {added && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="flex flex-col items-center rounded-lg bg-white px-12 py-8 shadow-lg">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#9C2327] text-4xl text-white">
              ✓
            </div>

            <p className="text-lg font-semibold text-black">
              Item has been added to your shopping bag
            </p>
          </div>
        </div>
      )}
    </>
  );
}
