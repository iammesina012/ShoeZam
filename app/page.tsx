"use client";

import Image from "next/image";
import { FaShoppingBag } from "react-icons/fa";
import { FaUser } from "react-icons/fa";

export default function Home() {
  return (
    <div className="bg-white min-h-screen">
      <header className="flex items-center justify-between bg-black p-4 pl-15 pr-10">
        <div className="flex">
          <Image src="/shoezam-logo.png" alt="ShoeZam logo" width={90} height={90} />
        </div>
        <div className="flex">
          <input type="text" placeholder="Search your shoes..." className="p-3 border rounded-lg" />
        </div>
        <div className="flex items-center gap-8">
          <FaShoppingBag className="text-2xl" />
          <FaUser className="text-2xl" />
        </div>
      </header>
    </div>
  );
}
