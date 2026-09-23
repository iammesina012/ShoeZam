import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";
import { FaShoppingBag } from "react-icons/fa";
import AddToBagButton from "@/components/add-to-bag-button";

// this page will receive params — container that has the id
type ProductPageProps = {
  params: Promise<{ id: string }>;
};

// give params that next.js sends to this page
export default async function Products({ params }: ProductPageProps) {
  const { id } = await params;

  const { data, error } = await supabase.from("products").select("*").eq("id", id).single();

  return (
    <div className="min-h-screen overflow-hidden bg-[#F2F2F2]">
      <main>
        <div className="flex min-h-[calc(100vh-114px)] items-center justify-between">
          {/* Shoe image + Red circle */}
          <section className="flex flex-1 items-center justify-center">
            <div className="relative w-96 h-96 rounded-full bg-[#9C2327]">
              <Image
                src={data?.image_url}
                alt={data?.name}
                fill
                className="absolute scale-150 rotate-28 object-contain"
              />
            </div>
          </section>
          {/* Product Details + Add to bag button */}
          <section className="flex flex-col flex-1 justify-center">
            <span className="w-fit rounded-full bg-[#E5E5E5] mt-4 px-4 py-2 text-sm font-semibold text-black">
              {data?.brand}
            </span>

            <h1 className="mt-4 max-w-2xl font-bold text-black text-4xl">{data?.name}</h1>
            <h2 className="mt-4 font-semibold text-[#9C2327] text-3xl">
              ₱
              {data?.price?.toLocaleString("en-PH", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </h2>
            <p className="mt-4 max-w-2xl border-b border-gray-300 pb-6 text-sm text-[#858585]">{data?.description}</p>

            <div>
              <h3 className="mt-4 font-semibold text-black text-xl">Color</h3>

              <div className="flex gap-4">
                <div className="mt-2 h-10 w-10 rounded-full bg-black cursor-pointer"></div>
                <div className="mt-2 h-10 w-10 rounded-full bg-black cursor-pointer"></div>
                <div className="mt-2 h-10 w-10 rounded-full bg-black cursor-pointer"></div>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold text-black text-xl">Size</h3>

              <div className="mt-4 flex gap-3">
                <button className="rounded-md border px-5 py-3 text-black cursor-pointer">7</button>
                <button className="rounded-md border px-5 py-3 text-black cursor-pointer">8</button>
                <button className="rounded-md border px-5 py-3 text-black cursor-pointer">9</button>
                <button className="rounded-md border px-5 py-3 text-black cursor-pointer">10</button>
                <button className="rounded-md border px-5 py-3 text-black cursor-pointer">11</button>
              </div>
            </div>

            <AddToBagButton product={data} />
          </section>
        </div>
      </main>
    </div>
  );
}
