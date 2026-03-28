
// transaction/endpoints.ts
"use server";
import endpoints from '@/lib/apiEndpoints';
import { fetchWithAuth } from "@/lib/api.server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";


export async function TransactionList() {
    return await fetchWithAuth(endpoints.transactions.list());
}

export async function TransactionDetail(uuid: string) {
    return await fetchWithAuth(endpoints.transactions.instance(uuid));
}

export async function AddTransaction(formData: FormData) {
    const type = formData.get("type") as string;
    const store = formData.get("store") as string;
    const total_price = parseFloat(formData.get("total_price") as string);
    console.log("Adding transaction:", { type, store, total_price }); // デバッグ用ログ
    
    await fetchWithAuth(endpoints.transactions.list(), {
        method: "POST",
        body: JSON.stringify({ type, store, total_price }),
    });

    revalidatePath("/transaction");
}

export async function EditTransaction(uuid: string, formData: FormData) {
    const type = formData.get("type") as string;
    const store = formData.get("store") as string;
    const total_price = parseFloat(formData.get("total_price") as string);
    console.log("Editing transaction:", { type, store, total_price }); // デバッグ用ログ
    
    const res = await fetchWithAuth(endpoints.transactions.instance(uuid), {
        method: "PUT",
        body: JSON.stringify({ type, store, total_price }),
    });
    revalidatePath("/transaction");
}

export async function AddBlukTransaction(formData: FormData) {
    const file = formData.get("file") as File;
    const form = new FormData();
    form.append("file", file);
    
    await fetchWithAuth(endpoints.transactions.list(), {
        method: "POST",
        body: form,
    });

    revalidatePath("/transaction");
}

export async function DeleteTransaction(uuid: string) {
    const res = await fetchWithAuth(endpoints.transactions.instance(uuid), {
        method: "DELETE",
    }); 
    console.log("Delete response:", res); // デバッグ用ログ

    revalidatePath(`/transaction/${uuid}`); // 一覧ページのキャッシュを破棄
    redirect("/transaction");       // 一覧へ移動
    
}

// export default { TransactionList, TransactionDetail, AddTransaction, EditTransaction, DeleteTransaction };