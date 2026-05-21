// actions.ts
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const cookieStore = await cookies();
const token = cookieStore.get("access")?.value;

export async function TransactionList() {

    const res = await fetch(`${process.env.DJANGO_INTERNAL_URL}/api/transactions/`,{
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        method: "GET",
        credentials: "include",
        // cache: "no-store", // キャッシュを無効化して常に最新のユーザー情報を取得
    });
    if(!res.ok){
        return []
    }
    return res.json();
}

export async function TransactionAdd(prevState: any, formData: FormData) {
  
    const res = await fetch(`${process.env.DJANGO_INTERNAL_URL}/api/transactions/`,{
        headers: { "Authorization": `Bearer ${token}` },
        method: "POST",
        credentials: "include",
        body: formData,
    });
    if(!res.ok){
        return prevState
    }
    return res.json();
}

export async function DeleteTransaction(uuid: string) {
  const res = await fetch(`${process.env.API_URL}/api/transactions/${uuid}/`, {
    method: "DELETE",
    headers: { Cookie: cookieStore.toString() },
  });

  if (res.ok) {
    revalidatePath("/transactions"); // 一覧ページのキャッシュを破棄
    redirect("/transactions");       // 一覧へ移動
  }
}


