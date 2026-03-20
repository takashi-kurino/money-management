// actions.ts
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function DeleteTransaction(uuid: string) {
  const cookieStore = await cookies();
  const res = await fetch(`${process.env.API_URL}/api/transactions/${uuid}/`, {
    method: "DELETE",
    headers: { Cookie: cookieStore.toString() },
  });

  if (res.status === 401) redirect("/login");

  if (res.ok) {
    revalidatePath("/transactions"); // 一覧ページのキャッシュを破棄
    redirect("/transactions");       // 一覧へ移動
  }
}