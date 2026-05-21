// lib/endpoints/user.ts
import api from '@/_lib/axiosapi';
import endpoints from '@/_lib/apiEndpoints';

export async function deleteAccount(password: string) {
    const response = await api.post(endpoints.user.deleteAccount(), { password });
    return response.data;
}

export async function UserInfo(){
    const res = await fetch("/api/auth/user",{
        method:"GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
    });

    if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.detail || "Login failed");
  }

  return await res.json(); // ← res.data は axios の書き方なので修正
}

// export async function UserInfo() {

//     const response = await api.get(endpoints.auth.user());
//     return response.data;
// }