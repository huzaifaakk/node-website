"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

async function verifyAdmin() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  if (!session?.value) {
    throw new Error("Unauthorized");
  }
}

export async function addProduct(formData: FormData) {
  await verifyAdmin();
  const supabase = await createClient();

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const image_path = formData.get("image_path") as string;
  const base_price = parseFloat(formData.get("base_price") as string);
  const is_available = formData.get("is_available") === "on";

  const { error } = await supabase.from("products").insert({
    name,
    description,
    image_path: image_path || null,
    base_price,
    is_available,
    slug: name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]/g, ""),
    sort_order: 0,
    is_featured: false,
  });

  if (error) throw new Error(error.message);

  revalidatePath("/menu");
  revalidatePath("/admin");
  revalidatePath("/");
}

export async function updateProduct(id: string, formData: FormData) {
  await verifyAdmin();
  const supabase = await createClient();

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const image_path = formData.get("image_path") as string;
  const base_price = parseFloat(formData.get("base_price") as string);
  const is_available = formData.get("is_available") === "on";

  const { error } = await supabase.from("products").update({
    name,
    description,
    image_path: image_path || null,
    base_price,
    is_available,
  }).eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/menu");
  revalidatePath("/admin");
  revalidatePath("/");
}

export async function deleteProduct(id: string) {
  await verifyAdmin();
  const supabase = await createClient();

  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/menu");
  revalidatePath("/admin");
  revalidatePath("/");
}
