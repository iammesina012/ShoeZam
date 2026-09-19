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
        <section>
          <div className="relative w-full h-80">
            <Image
              src="/converse-hero4.jpg"
              alt="A blue shoe with white lace against a red background."
              fill
              className="object-cover object-[center_50%]"
            />
            <div className="absolute inset-0 bg-black/40" />
            <h1 className="absolute left-14 bottom-14 text-6xl font-bold text-white">Converse</h1>
          </div>
        </section>
      </main>
    </div>
  );
}
