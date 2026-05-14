// actions.ts

"use server"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

async function getToken(): Promise<string | undefined> {
    const cookieStore = await cookies();
    return cookieStore.get("access")?.value;
}

export async function GetTransactionList() {
    const token = await getToken();

    const res = await fetch(`${process.env.DJANGO_INTERNAL_URL}/api/transactions/`,{
        headers: {  "Authorization": `Bearer ${token}` },
        method: "GET",
        cache: "no-store", // キャッシュを無効化して常に最新のユーザー情報を取得
    });
    if(!res.ok){
        return []
    }
    return res.json();
}

export async function PostTransaction(prevState: any,formData: FormData) {
    const token = await getToken();

    const res = await fetch(`${process.env.DJANGO_INTERNAL_URL}/api/transactions/`,{
        headers: { "Authorization": `Bearer ${token}` },
        method: "POST",
        body: formData,
    });
    if(!res.ok){
        return { message: "取引の追加に失敗しました" }
    }
    if(res.ok){
        revalidatePath("/transaction"); // 一覧ページのキャッシュを破棄
        redirect("/transaction");       // 一覧へ移動
    }
    return { message: "取引が正常に追加されました" };
}

export async function GetTransactionDetail(uuid: string) {
    const token = await getToken();
    
    const res = await fetch(`${process.env.DJANGO_INTERNAL_URL}/api/transactions/${uuid}/`,{
        headers: { "Authorization": `Bearer ${token}` },
        method: "GET",
        cache: "no-store", // キャッシュを無効化して常に最新のユーザー情報を取得
    });
    if(!res.ok){
        return null
    }
    return res.json();
}

export async function PutTransaction(uuid: string, prevState: any, formData: FormData) {
    const token = await getToken();
    const res = await fetch(`${process.env.DJANGO_INTERNAL_URL}/api/transactions/${uuid}/`,{
        headers: {  "Authorization": `Bearer ${token}` },
        method: "PUT",
        body: formData,
    });
    if(!res.ok){
        return { message: "取引の編集に失敗しました" }
    }
    if(res.ok){
        revalidatePath("/transaction"); // 一覧ページのキャッシュを破棄
        redirect("/transaction");       // 一覧へ移動
    }
    return { message: "取引が正常に編集されました" };
}

export async function DeleteTransaction(uuid: string) {
    const token = await getToken();
  const res = await fetch(`${process.env.DJANGO_INTERNAL_URL}/api/transactions/${uuid}/`, {
    method: "DELETE",
    headers: { "Authorization": `Bearer ${token}` },
  });

  if (res.ok) {
    revalidatePath("/transaction"); // 一覧ページのキャッシュを破棄
    redirect("/transaction");       // 一覧へ移動
  }
}

export async function GetCategoryList() {
    const token = await getToken();

    const res = await fetch(`${process.env.DJANGO_INTERNAL_URL}/api/categories/`,{
        headers: { "Authorization": `Bearer ${token}` },
        method: "GET",
        cache: "no-store", // キャッシュを無効化して常に最新のユーザー情報を取得
    });
    if(!res.ok){
        return []
    }
    return res.json();
}

export async function GetCategoryDetail(uuid: string) {
    const token = await getToken();
    
    const res = await fetch(`${process.env.DJANGO_INTERNAL_URL}/api/categories/${uuid}/`,{
        headers: { "Authorization": `Bearer ${token}` },
        method: "GET",
        cache: "no-store", // キャッシュを無効化して常に最新のユーザー情報を取得
    });
    if(!res.ok){
        return null
    }
    return res.json();
}

export async function PostCategory(prevState: any, formData: FormData) {
    const token = await getToken();
    const name = formData.get("name");

    const res = await fetch(`${process.env.DJANGO_INTERNAL_URL}/api/categories/`,{
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        method: "POST",
        body: JSON.stringify( {name} ),
    });
    
    if(!res.ok){
        return { message: `カテゴリーの追加に失敗しました: ${res.status}` }
    }
    
    revalidatePath("/category"); // 一覧ページのキャッシュを破棄
    redirect("/category");       // 一覧へ移動
}

export async function EditCategory(uuid: string, prevState: any, formData: FormData) {
    const token = await getToken();
    const name = formData.get("name");

    const res = await fetch(`${process.env.DJANGO_INTERNAL_URL}/api/categories/${uuid}/`,{
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        method: "PUT",
        body: JSON.stringify( {name} ),
    });
    
    if(!res.ok){
        return { message: `カテゴリーの編集に失敗しました: ${res.status}` }
    }
    
    revalidatePath("/category"); // 一覧ページのキャッシュを破棄
    redirect("/category");       // 一覧へ移動
}

export async function DeleteCategory(uuid: string) {
    const token = await getToken();
    const res = await fetch(`${process.env.DJANGO_INTERNAL_URL}/api/categories/${uuid}/`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` },
    });

    if (res.ok) {
        revalidatePath("/category"); // 一覧ページのキャッシュを破棄
        redirect("/category");       // 一覧へ移動
    }
}