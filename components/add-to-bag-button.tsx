"use client";

import { FaShoppingBag } from "react-icons/fa";

type AddToBagButtonProps = {
  product: any;
};

export default function AddToBagButton({ product }: AddToBagButtonProps) {
  return (
    <button
      type="button"
      className="mt-6 flex max-w-sm items-center justify-center gap-3 rounded-xl bg-[#9C2327] px-6 py-5 text-lg font-bold cursor-pointer"
      onClick={() => {
        localStorage.setItem("shoppingBag", JSON.stringify(product));
      }}
    >
      <FaShoppingBag className="text-xl" />
      Add to Bag
    </button>
  );
}
