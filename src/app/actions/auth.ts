"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAdmin(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  const correctEmail = process.env.ADMIN_EMAIL || "admin@thenodecafe.com";
  const correctPassword = process.env.ADMIN_PASSWORD || "admin123";

  if (email === correctEmail && password === correctPassword) {
    const cookieStore = await cookies();
    // In production, you would sign this token. For this demo, setting a secure cookie is sufficient.
    cookieStore.set("admin_session", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7 // 1 week
    });

    redirect("/admin");
  } else {
    return { error: "Invalid email or password." };
  }
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  redirect("/admin/login");
}
