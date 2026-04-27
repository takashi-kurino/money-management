

import {cookies} from 'next/headers'

export async function getUserName(){
    const cookieStore = await cookies();
    const token = cookieStore.get("access")?.value;

    const res = await fetch(`${process.env.DJANGO_INTERNAL_URL}api/auth/user/`,{
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        method: "GET",
        credentials: "include",
        cache: "no-store", // キャッシュを無効化して常に最新のユーザー情報を取得
    });
    if(!res.ok){
        return null
    }
    const data = await res.json()

    return data.username
}