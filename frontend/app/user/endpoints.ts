// lib/endpoints/user.ts
import api from '@/lib/axiosapi';
import endpoints from '@/lib/apiEndpoints';

export async function deleteAccount(password: string) {
    const response = await api.post(endpoints.user.deleteAccount(), { password });
    return response.data;
}

export async function UserInfo() {
    const response = await api.get(endpoints.auth.user());
    return response.data;
}