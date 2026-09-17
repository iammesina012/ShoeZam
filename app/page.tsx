import Image from "next/image";
import { FaSearch, FaShoppingBag, FaUser } from "react-icons/fa";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <header className="flex items-center gap-12 bg-black px-10 py-5">
        <Image src="/shoezam-logo.png" alt="ShoeZam logo" width={90} height={90} />

        <div className="relative flex-1">
          <input type="text" placeholder="Search your shoes..." className="w-full rounded-lg border p-3" />
          <FaSearch className="absolute right-5 top-1/2 -translate-y-1/2" />
        </div>

        <div className="flex items-center gap-8 text-2xl text-white">
          <FaShoppingBag />
          <FaUser />
        </div>
      </header>

      <main>
        <section className="px-12 py-8">
          <div className="flex min-h-[450px] items-center justify-between rounded-3xl bg-[#E8E8E8] px-25">
            <div className="max-w-xl">
              <p className="text-3xl font-bold text-[#9C2327]">NEW ARRIVAL!</p>

              <h1 className="mt-4 text-5xl font-bold text-black">Vans Old Skool LX Comme Des Garcons</h1>

              <p className="mt-8 text-lg text-[#939393]">
                Features a predominantly black upper made of canvas with suede detailing on the toebox, eyestays, and
                heel.
              </p>

              <button type="button" className="mt-8 rounded-full bg-black px-10 py-4 text-lg text-white">
                View product
              </button>
            </div>

            <div className="relative flex items-center justify-center">
              <div className="absolute h-[380px] w-[380px] rounded-full bg-[#9C2327]" />

              <Image
                src="/vans-old-skool-lx-cdgb.png"
                alt="Vans Black and White Sneakers"
                width={550}
                height={400}
                className="relative z-10 -translate-x-8 -translate-y-16 scale-x-[-1] -rotate-28 object-contain"
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
