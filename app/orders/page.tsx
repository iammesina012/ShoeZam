import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";

export default async function Orders() {
  const { data: orders, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  console.log("Orders:", orders);

  const { data: orderItems, error: itemsError } = await supabase.from("order_items").select("*");

  console.log("Order items:", orderItems);

  const { data: products, error: productsError } = await supabase
    .from("products")
    .select("id, image_url");

  console.log("Products:", products);

  const ordersWithItems = orders?.map((order) => ({
    ...order,
    items: orderItems
      ?.filter((item) => item.order_id === order.id)
      .map((item) => ({
        ...item,
        image_url: products?.find((product) => product.id === item.product_id)?.image_url,
      })),
  }));

  console.log("Orders with items:", ordersWithItems);

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
        {ordersWithItems
          ?.filter((order) => order.items && order.items.length > 0)
          .map((order) => {
            const groupedItems = order.items.reduce((groups: any, item: any) => {
              if (!groups[item.brand]) {
                groups[item.brand] = [];
              }

              groups[item.brand].push(item);

              return groups;
            }, {});

            return (
              <section key={order.id} className="w-full bg-white mt-4 p-4 mb-4">
                {/* Products grouped by brand */}
                {Object.entries(groupedItems).map(([brand, items]: [string, any]) => (
                  <div key={brand}>
                    {/* Brand */}
                    <div>
                      <span className="mb-4 px-4 block text-sm font-bold text-black">{brand}</span>

                      <hr className="-mx-4 block border-gray-200" />
                    </div>

                    {/* Products */}
                    {items.map((item: any) => (
                      <div key={item.id} className="flex items-center gap-4 px-4 py-4">
                        <div className="relative h-24 w-24">
                          <Image
                            src={item.image_url}
                            alt={item.product_name}
                            fill
                            className="object-contain"
                          />
                        </div>

                        <div className="flex flex-1 flex-col">
                          <p className="text-sm text-black">{item.product_name}</p>

                          <p className="mt-2 text-sm text-[#858585]">Variation: {item.variation}</p>

                          <p className="text-sm text-[#858585]">Quantity: {item.quantity}</p>
                        </div>

                        <p className="text-sm text-black">
                          ₱
                          {item.subtotal.toLocaleString("en-PH", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </p>
                      </div>
                    ))}
                  </div>
                ))}

                {/* Order Total + Payment Method */}
                <div>
                  <hr className="-mx-4 border-gray-200" />

                  <div className="mt-4 flex items-center justify-between px-4">
                    <p className="text-sm text-black">
                      Payment Method:{" "}
                      <span className="text-lg font-semibold text-[#9C2327]">
                        {order.payment_method === "cod"
                          ? "Cash on Delivery"
                          : order.payment_method === "gcash"
                            ? "GCash"
                            : order.payment_method === "maya"
                              ? "Maya"
                              : "Credit/Debit Card"}
                      </span>
                    </p>

                    <p className="flex items-center justify-end text-sm text-black">
                      Order Total:
                      <span className="ml-2 text-lg font-semibold text-[#9C2327]">
                        ₱
                        {order.total.toLocaleString("en-PH", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </p>
                  </div>
                </div>
              </section>
            );
          })}
      </main>
    </div>
  );
}
