// app/actions/login.ts
"use server";

import { loginUser } from "../fetchActions";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  await loginUser({
    username: String(formData.get("username")),
    password: String(formData.get("password")),
  });

  // Cookieがセットされた状態で
  redirect("/");
}
