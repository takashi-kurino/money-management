
// endpoints/todo.ts
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

export async function AddTransaction(name: string) {
    return await fetchWithAuth(endpoints.transactions.list(), {
        method: "POST",
        body: JSON.stringify({ name }),
    });
}

export async function EditTransaction(uuid: string, name: string) {
    return await fetchWithAuth(endpoints.transactions.instance(uuid), {
        method: "PUT",
        body: JSON.stringify({ name }),
    });
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