"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaSearch, FaShoppingBag, FaUser } from "react-icons/fa";

export default function Header() {
  const pathname = usePathname();

  if (
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/cart" ||
    pathname === "/checkout"
  ) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 bg-black">
      <div className="flex items-center gap-4 p-4 sm:gap-8 sm:py-4 lg:px-56">
        <Link href="/" className="shrink-0">
          <Image
            src="/logos/shoezam-logo.png"
            alt="ShoeZam logo"
            width={90}
            height={90}
            className="cursor-pointer"
          />
        </Link>

        <div className="relative min-w-0 flex-1">
          <input
            type="text"
            placeholder="Search your shoes..."
            className="w-full rounded-lg border border-gray-400 bg-white p-3 text-black placeholder:text-gray-500"
          />
          <FaSearch className="absolute right-5 top-1/2 -translate-y-1/2 text-black" />
        </div>

        <div className="hidden shrink-0 items-center gap-8 text-2xl text-white sm:flex">
          <Link href="/cart">
            <FaShoppingBag className="cursor-pointer" />
          </Link>
          <FaUser className="cursor-pointer" />
        </div>
      </div>
    </header>
  );
}
