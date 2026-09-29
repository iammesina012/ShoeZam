import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="flex flex-col items-center py-8 justify-center text-white sm:px-10">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/logos/shoezam-logo.png"
            alt="ShoeZam logo"
            width={90}
            height={90}
            className="h-auto w-20 sm:w-24"
          />
        </Link>

        {/* Navigation */}
        <nav className="mt-6 grid grid-cols-2 gap-x-10 gap-y-4 text-sm sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-8">
          <Link href="/" className="text-center transition hover:text-[#9C2327]">
            Home
          </Link>

          <Link href="/account" className="text-center transition hover:text-[#9C2327]">
            Account
          </Link>

          <Link href="/cart" className="text-center transition hover:text-[#9C2327]">
            Shopping Bag
          </Link>

          <Link href="/orders" className="text-center transition hover:text-[#9C2327]">
            Orders
          </Link>
        </nav>

        {/* Copyright */}
        <p className="mt-8 text-center text-xs text-[#858585] sm:text-sm">
          &copy; 2026 ShoeZam. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
