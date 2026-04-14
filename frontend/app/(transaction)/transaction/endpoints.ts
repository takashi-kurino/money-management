
// transaction/endpoints.ts
"use server";
import endpoints from '@/lib/apiEndpoints';
import { fetchWithAuth } from "@/lib/api.server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

// 取引関連のエンドポイント

export async function TransactionList() {
    const res = await fetchWithAuth(endpoints.transactions.list());
    if (res.status === 204) return "no content"; // データがない場合は特別に扱う
    return res.json();
    //
}

export async function TransactionDetail(uuid: string) {
    const res = await fetchWithAuth(endpoints.transactions.instance(uuid));
    if (res.status === 204) return "no content"; // データがない場合は特別に扱う
    return res.json();
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

// items を含めた取引を追加する関数
export async function AddTransactionWithItems(data: {
    type: string;
    store: string;
    items: Array<{ name: string; price: number; amount: number }>;
}) {
    console.log("Adding transaction with items:", data); // デバッグ用ログ
    
    await fetchWithAuth(endpoints.transactions.list(), {
        method: "POST",
        body: JSON.stringify(data),
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

export async function DeleteTransaction(uuid: string) {
    const res = await fetchWithAuth(endpoints.transactions.instance(uuid), {
        method: "DELETE",
    }); 
    console.log("Delete response:", res); // デバッグ用ログ

    revalidatePath(`/transaction/${uuid}`); // 一覧ページのキャッシュを破棄
    redirect("/transaction");       // 一覧へ移動
    
}

// アイテム関連のエンドポイント

export async function ItemDetail(transactionId: string,itemId: string) {
    return await fetchWithAuth(endpoints.items.instance(transactionId,itemId));
}

export async function AddItem(transactionId: string, formData: FormData){
    const name = formData.get("name") as string;
    const amount = parseInt(formData.get("amount") as string);
    const price = parseFloat(formData.get("price") as string);
    console.log("Adding item:", { name, amount, price }); // デバッグ用ログ
    
    await fetchWithAuth(endpoints.items.list(transactionId), {
        method: "POST",
        body: JSON.stringify({ name, amount, price }),
    });

    revalidatePath(`/transaction/${transactionId}`);
}

export async function EditItem(transactionId: string,itemId: string, formData: FormData) {
    const name = formData.get("name") as string;
    const amount = parseInt(formData.get("amount") as string);
    const price = parseFloat(formData.get("price") as string);
    console.log("Editing item:", { name, amount, price }); // デバッグ用ログ
    
    const res = await fetchWithAuth(endpoints.items.instance(transactionId,itemId), {
        method: "PUT",
        body: JSON.stringify({ name, amount, price }),
    });
    revalidatePath("/transaction");
}

export async function DeleteItem(transactionId: string,itemId: string) {
    const res = await fetchWithAuth(endpoints.items.instance(transactionId,itemId), {
        method: "DELETE",
    }); 
    console.log("Delete item response:", res); // デバッグ用ログ

    revalidatePath(`/transaction/${transactionId}/item/${itemId}`); // 一覧ページのキャッシュを破棄
    redirect(`/transaction/${transactionId}`);       // 一覧へ移動
    
}

// カテゴリ関連のエンドポイント

export async function CategoryList() {
    const res = await fetchWithAuth(endpoints.categories.list());
    return res.json();
}

export async function CategoryDetail(uuid: string) {
    const res = await fetchWithAuth(endpoints.categories.instance(uuid));
    return res.json();
}

export async function AddCategory(formData: FormData) {
    const name = formData.get("name") as string;
    
    const res = await fetchWithAuth(endpoints.categories.list(), {
        method: "POST",
        body: JSON.stringify({ name }),
    });
    const data = await res.json();
    
    if (res.ok) revalidatePath("/transaction/category");
    
    return {ok:res.ok,status:res.status,data:data}; // 追加したカテゴリ名を返す
}

export async function EditCategory(categoryId: string, formData: FormData) {
    const name = formData.get("name") as string;
    console.log("Editing category:", { name }); // デバッグ用ログ
    
    await fetchWithAuth(endpoints.categories.instance(categoryId), {
        method: "PUT",
        body: JSON.stringify({ name }),
    });
    revalidatePath("/transaction/category");
}

export async function DeleteCategory(categoryId: string) {
    const res = await fetchWithAuth(endpoints.categories.instance(categoryId), {
        method: "DELETE",
    }); 
    console.log("Delete category response:", res); // デバッグ用ログ

    revalidatePath(`/transaction/category/${categoryId}`); // 一覧ページのキャッシュを破棄
    redirect(`/transaction/category`);       // 一覧へ移動
    
}