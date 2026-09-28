"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { FaBars, FaUserCircle, FaShoppingBag } from "react-icons/fa";
import { FiTag, FiUser, FiShoppingBag, FiLogOut, FiChevronDown, FiChevronUp } from "react-icons/fi";

export default function Header() {
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);
  const [brandsOpen, setBrandsOpen] = useState(false);

  if (
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/cart" ||
    pathname === "/checkout" ||
    pathname === "/order-confirmation" ||
    pathname === "/orders"
  ) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 bg-black">
      <div className="header grid grid-cols-[1fr_auto_1fr] items-center p-4">
        {/* Left */}
        <div className="flex items-center">
          {/* Hamburger - Mobile */}
          <div className="lg:hidden">
            <FaBars
              className="cursor-pointer text-2xl text-white"
              onClick={() => setMenuOpen(true)}
            />
          </div>

          {/* Logo - Desktop */}
          <Link href="/" className="hidden shrink-0 lg:block">
            <Image
              src="/logos/shoezam-logo.png"
              alt="ShoeZam logo"
              width={90}
              height={90}
              className="cursor-pointer"
            />
          </Link>
        </div>

        {/* Center */}
        <div className="flex items-center justify-center">
          {/* Logo - Mobile */}
          <Link href="/" className="lg:hidden">
            <Image
              src="/logos/shoezam-logo.png"
              alt="ShoeZam logo"
              width={90}
              height={90}
              className="cursor-pointer"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-4 text-white lg:flex lg:gap-6">
            <Link href="/brands/adidas" className="hover:text-[#9C2327]">
              Adidas
            </Link>

            <Link href="/brands/converse" className="hover:text-[#9C2327]">
              Converse
            </Link>

            <Link href="/brands/new-balance" className="hover:text-[#9C2327]">
              New Balance
            </Link>

            <Link href="/brands/nike" className="hover:text-[#9C2327]">
              Nike
            </Link>

            <Link href="/brands/vans" className="hover:text-[#9C2327]">
              Vans
            </Link>
          </nav>
        </div>

        {/* Right */}
        <div className="flex items-center justify-end gap-6 text-2xl text-white">
          {/* Shopping Bag */}
          <Link href="/cart">
            <FaShoppingBag className="cursor-pointer" />
          </Link>

          {/* Profile - Desktop only */}
          <FaUserCircle className="hidden cursor-pointer lg:block" />
        </div>
      </div>

      {/* Mobile Sidebar */}
      {menuOpen && (
        <>
          {/* Overlay */}
          <div className="fixed inset-0 z-40 bg-black/50" onClick={() => setMenuOpen(false)} />

          {/* Sidebar */}
          <aside className="fixed left-0 top-0 z-50 flex h-screen w-72 flex-col bg-white p-6 text-black shadow-xl">
            {/* Profile */}
            <div className="flex items-center gap-3">
              <FaUserCircle className="text-4xl text-[#858585]" />

              <p className="font-semibold">Michael William Mesina</p>
            </div>

            {/* Divider */}
            <div className="my-6 border-t border-gray-200" />

            {/* Navigation */}
            <nav className="flex flex-col">
              {/* Brands */}
              <button
                type="button"
                className={`flex cursor-pointer items-center gap-4 py-3 transition-colors ${
                  pathname.startsWith("/brands/")
                    ? "text-[#9C2327]"
                    : "text-black hover:text-[#9C2327]"
                }`}
                onClick={() => setBrandsOpen(!brandsOpen)}
              >
                <FiTag className="text-xl" />

                <span className="flex-1 text-left">Brands</span>

                {brandsOpen ? (
                  <FiChevronUp className="text-lg" />
                ) : (
                  <FiChevronDown className="text-lg" />
                )}
              </button>

              {/* Brand Links */}
              {brandsOpen && (
                <div className="ml-9 flex flex-col border-l border-[#858585] pl-4">
                  <Link
                    href="/brands/adidas"
                    className={`py-2 transition-colors ${
                      pathname === "/brands/adidas"
                        ? "text-[#9C2327]"
                        : "text-black hover:text-[#9C2327]"
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    Adidas
                  </Link>

                  <Link
                    href="/brands/converse"
                    className={`py-2 transition-colors ${
                      pathname === "/brands/converse"
                        ? "text-[#9C2327]"
                        : "text-black hover:text-[#9C2327]"
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    Converse
                  </Link>

                  <Link
                    href="/brands/new-balance"
                    className={`py-2 transition-colors ${
                      pathname === "/brands/new-balance"
                        ? "text-[#9C2327]"
                        : "text-black hover:text-[#9C2327]"
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    New Balance
                  </Link>

                  <Link
                    href="/brands/nike"
                    className={`py-2 transition-colors ${
                      pathname === "/brands/nike"
                        ? "text-[#9C2327]"
                        : "text-black hover:text-[#9C2327]"
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    Nike
                  </Link>

                  <Link
                    href="/brands/vans"
                    className={`py-2 transition-colors ${
                      pathname === "/brands/vans"
                        ? "text-[#9C2327]"
                        : "text-black hover:text-[#9C2327]"
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    Vans
                  </Link>
                </div>
              )}

              {/* Account */}
              <Link
                href="/account"
                className={`flex items-center gap-4 py-3 transition-colors ${
                  pathname === "/account" ? "text-[#9C2327]" : "text-black hover:text-[#9C2327]"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                <FiUser className="text-xl" />
                <span>Account</span>
              </Link>

              {/* Orders */}
              <Link
                href="/orders"
                className={`flex items-center gap-4 py-3 transition-colors ${
                  pathname === "/orders" ? "text-[#9C2327]" : "text-black hover:text-[#9C2327]"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                <FiShoppingBag className="text-xl" />
                <span>Orders</span>
              </Link>
            </nav>

            {/* Logout */}
            <button
              type="button"
              className="mt-auto flex cursor-pointer items-center gap-4 py-3 text-black transition-colors hover:text-[#9C2327]"
              onClick={() => {
                // Logout will be implemented later
              }}
            >
              <FiLogOut className="text-xl" />
              <span>Log out</span>
            </button>
          </aside>
        </>
      )}
    </header>
  );
}
