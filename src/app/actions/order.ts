"use server";

import { createClient } from "@/utils/supabase/server";

interface OrderItemInput {
  product_id: string;
  product_name: string;
  variant_id?: string;
  variant_name?: string;
  quantity: number;
  unit_price: number;
  line_total: number;
}

export async function createOrder(
  orderType: string,
  branch: string,
  totalAmount: number,
  items: OrderItemInput[],
  customerName: string,
  phone: string,
  address: string,
  paymentMethod: string
) {
  const supabase = await createClient();

  // 1. Insert Order
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      order_type: orderType,
      branch: branch,
      customer_name: customerName,
      total_amount: totalAmount,
      total: totalAmount, // The schema has 'total'
      address: address,
      phone: phone,
      subtotal: totalAmount,
      delivery_fee: 0,
      payment_method: paymentMethod,
      status: "pending_confirmation"
    } as any)
    .select()
    .single();

  if (orderError) throw new Error(orderError.message);

  // 2. Insert Order Items
  const orderItemsData = items.map((item) => ({
    order_id: order.id,
    product_id: item.product_id,
    product_name: item.product_name,
    variant_id: item.variant_id,
    variant_name: item.variant_name,
    quantity: item.quantity,
    unit_price: item.unit_price,
    line_total: item.line_total
  }));

  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(orderItemsData);

  if (itemsError) throw new Error(itemsError.message);

  return order;
}
