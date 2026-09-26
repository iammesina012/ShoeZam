import Link from "next/link";
import Image from "next/image";

export default function Orders() {
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

          <h2 className="text-lg">My Orders</h2>
        </div>
      </header>

      <main>
        <section className="w-full bg-white mt-4 p-4">
          {/* Brand */}
          <div>
            <span className="mb-4 px-4 block text-sm font-bold text-black">Adidas</span>
            <hr className="-mx-4 block border-gray-200" />
          </div>

          {/* Product */}
          <div className="flex items-center gap-4 px-4 py-4">
            <div className="h-24 w-24 bg-gray-100">{/* Product image will go here */}</div>

            <div className="flex flex-1 flex-col">
              <p className="text-sm text-black">Adidas Superstar 80</p>

              <p className="mt-2 text-sm text-[#858585]">Variation: White</p>

              <p className="text-sm text-[#858585]">Quantity: 1</p>
            </div>

            <p className="text-sm text-black">₱4,500.00</p>
          </div>

          {/* Order Total */}
          <div>
            <hr className="-mx-4 border-gray-200" />
            <p className="flex items-center justify-end mt-4 text-sm text-black">
              Order Total:
              <span className="ml-2 text-lg font-semibold text-[#9C2327]">₱4,500.00</span>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
