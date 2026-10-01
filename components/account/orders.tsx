"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";

export default function OrdersTab() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data: orders, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      const { data: orderItems, error: itemsError } = await supabase
        .from("order_items")
        .select("*");

      const { data: products, error: productsError } = await supabase
        .from("products")
        .select("id, image_url");

      if (error || itemsError || productsError) {
        console.error(error || itemsError || productsError);
        return;
      }

      const ordersWithItems = orders?.map((order) => ({
        ...order,
        items: orderItems
          ?.filter((item) => item.order_id === order.id)
          .map((item) => ({
            ...item,
            image_url: products?.find((product) => product.id === item.product_id)?.image_url,
          })),
      }));

      setOrders(ordersWithItems || []);
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold text-black">My Orders</h2>

      <p className="mt-1 text-sm text-[#858585]">Track and manage your orders.</p>

      <div className="mt-8">
        {orders
          .filter((order) => order.items && order.items.length > 0)
          .map((order) => (
            <section
              key={order.id}
              className="mb-6 w-full rounded-xl border border-[#DBDBDB] bg-white"
            >
              {/* Order Information */}
              <div className="flex items-center justify-between border-b border-[#DBDBDB] px-4 py-4">
                <p className="text-sm text-black">
                  Order ID: <span>{order.id}</span>
                </p>

                <p className="text-sm text-black">
                  Date Ordered:{" "}
                  <span>
                    {new Date(order.created_at).toLocaleDateString("en-PH", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </p>
              </div>

              {/* Products */}
              {order.items.map((item: any) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 border-b border-[#DBDBDB] px-4 py-4"
                >
                  <div className="relative h-24 w-24 shrink-0">
                    <Image
                      src={item.image_url}
                      alt={item.product_name}
                      fill
                      className="object-contain"
                    />
                  </div>

                  <div className="flex flex-1 flex-col">
                    <p className="text-sm font-semibold text-black">{item.brand}</p>

                    <p className="mt-1 text-sm text-black">{item.product_name}</p>

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

              {/* Payment Method + Order Total */}
              <div className="flex items-center justify-between px-4 py-4">
                <p className="text-sm text-black">
                  Payment Method:{" "}
                  <span className="text-sm font-bold text-[#9C2327]">
                    {order.payment_method === "cod"
                      ? "Cash on Delivery"
                      : order.payment_method === "gcash"
                        ? "GCash"
                        : order.payment_method === "maya"
                          ? "Maya"
                          : "Credit/Debit Card"}
                  </span>
                </p>

                <p className="text-sm text-black">
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
            </section>
          ))}
      </div>
    </div>
  );
}
