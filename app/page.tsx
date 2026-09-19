import Image from "next/image";
import Link from "next/link";
import { FaSearch, FaShoppingBag, FaUser } from "react-icons/fa";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F2F2F2]">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center gap-12 bg-black px-10 py-5">
        <Link href="/">
          <Image src="/shoezam-logo.png" alt="ShoeZam logo" width={90} height={90} className="cursor-pointer" />
        </Link>
        <div className="relative flex-1">
          <input type="text" placeholder="Search your shoes..." className="w-full rounded-lg border p-3" />
          <FaSearch className="absolute right-5 top-1/2 -translate-y-1/2" />
        </div>
        <div className="flex items-center gap-8 text-2xl text-white">
          <FaShoppingBag className="cursor-pointer" />
          <FaUser className="cursor-pointer" />
        </div>
      </header>

      <main>
        {/* Hero Banner */}
        <section className="px-12 py-8">
          <div className="flex items-center justify-between rounded-3xl bg-white px-25 py-15">
            {/* Text */}
            <div className="max-w-xl">
              <p className="text-3xl font-bold text-[#9C2327]">NEW ARRIVAL!</p>

              <h1 className="mt-4 text-5xl font-bold text-black">Vans Old Skool LX Comme Des Garcons</h1>

              <p className="mt-8 text-lg text-[#858585]">
                Features a predominantly black upper made of canvas with suede detailing on the toebox, eyestays, and
                heel.
              </p>

              <button type="button" className="mt-8 rounded-full bg-black px-10 py-4 text-lg text-white cursor-pointer">
                View product
              </button>
            </div>

            {/* Red circle + Shoe image */}
            <div className="relative flex items-center justify-center">
              <div className="absolute h-95 w-95 rounded-full bg-[#9C2327]" />

              <Image
                src="/vans-old-skool-lx-cdgb.png"
                alt="Vans Black and White Sneakers"
                width={550}
                height={400}
                className="-translate-x-8 -translate-y-16 scale-x-[-1] -rotate-28 object-contain"
              />
            </div>
          </div>
        </section>

        <section className="mt-4">
          <div className="flex flex-col items-center">
            <h2 className="font-bold text-5xl text-black">Shop by Brand</h2>
            <p className="mt-4 text-xl text-[#858585]">Explore your favorite footwear brands, all in one place.</p>
          </div>
          <div className="flex items-center justify-center gap-4 px-10">
            <Link
              href="/brands/adidas"
              className="flex-1 aspect-square mt-8 bg-white p-16 rounded-3xl flex items-center justify-center cursor-pointer"
            >
              <Image
                src="/adidas.png"
                alt="Adidas logo"
                width={90}
                height={90}
                className="w-full h-full object-contain"
              />
            </Link>
            <Link
              href="/brands/converse"
              className="flex-1 aspect-square mt-8 bg-white p-16 rounded-3xl flex items-center justify-center cursor-pointer"
            >
              <Image
                src="/converse.png"
                alt="Converse logo"
                width={90}
                height={90}
                className="w-full h-full object-contain"
              />
            </Link>
            <Link
              href="/brands/new-balance"
              className="flex-1 aspect-square mt-8 bg-white p-16 rounded-3xl flex items-center justify-center cursor-pointer"
            >
              <Image
                src="/newbalance.png"
                alt="New Balance logo"
                width={90}
                height={90}
                className="w-full h-full object-contain"
              />
            </Link>
            <Link
              href="/brands/nike"
              className="flex-1 aspect-square mt-8 bg-white p-16 rounded-3xl flex items-center justify-center cursor-pointer"
            >
              <Image src="/nike.png" alt="Nike logo" width={90} height={90} className="w-full h-full object-contain" />
            </Link>
            <Link
              href="/brands/vans"
              className="flex-1 aspect-square mt-8 bg-white p-16 rounded-3xl flex items-center justify-center cursor-pointer"
            >
              <Image src="/vans.png" alt="Vans logo" width={90} height={90} className="w-full h-full object-contain" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
