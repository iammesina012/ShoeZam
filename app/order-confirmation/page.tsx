import Link from "next/link";
import Image from "next/image";
import { FaCheck } from "react-icons/fa";

export default function OrderConfirmation() {
  return (
    <div className="min-h-screen bg-[#F2F2F2]">
      <header className="flex items-center bg-black px-42 py-4">
        <div className="flex items-center gap-4">
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

          <h2 className="text-lg">Order Confirmation</h2>
        </div>
      </header>

      <main>
        <section className="flex flex-col items-center py-24">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#9C2327]">
            <FaCheck className="text-4xl text-white" />
          </div>

          <h1 className="mt-6 text-2xl font-bold text-black">Order placed successfully!</h1>

          <div className="mt-6 flex gap-4">
            <Link
              href="/orders"
              className="rounded-lg border border-[#9C2327] px-8 py-4 font-semibold text-[#9C2327] hover:bg-[#9C2327] hover:text-white"
            >
              View Order
            </Link>

            <Link
              href="/"
              className="rounded-lg bg-[#9C2327] px-8 py-4 font-semibold text-white hover:bg-[#7F1C20]"
            >
              Continue Shopping
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
