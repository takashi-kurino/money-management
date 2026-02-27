
// auth/endpoints.ts - uses centralized apiEndpoints

import api from '@/lib/axiosapi';
import endpoints from '@/lib/apiEndpoints';

export async function refreshToken() {
    console.log('Attempting token refresh...');
    try {
        const res = await api.post(endpoints.auth.refresh());
        return res.data;
    } catch (err) {
        console.error('Error refreshing token:', err);
        throw err;
    }
}

export async function UserInfo() {
    const response = await api.get(endpoints.auth.user());
    return response.data;
}


export async function loginUser(username: string, password: string) {
    const response = await api.post(endpoints.auth.login(), { username, password });
    return response.data;
}

export async function logoutUser() {
    const response = await api.post(endpoints.auth.logout());
    return response.data;
}

export async function passwordChange(new_password1: string, new_password2: string, old_password: string) {
    const response = await api.post(endpoints.auth.passwordChange(), { new_password1, new_password2, old_password });
    return response.data;
}

export async function passwordReset(email: string) {
    const response = await api.post(endpoints.auth.passwordReset(), { email });
    return response;
}

export async function passwordResetConfirm(uid: string, token: string, new_password1: string, new_password2: string) {
    const response = await api.post(endpoints.auth.passwordResetConfirm(), { uid, token, new_password1, new_password2 });
    return response.data;
}

export async function registerUser(username: string, email: string, password1: string, password2: string) {
    const response = await api.post(endpoints.auth.registration(), { username, email, password1, password2 });
    return response.data;
}

export async function verifyEmail(key: string) {
    const response = await api.post(endpoints.auth.registrationVerify(), { key });
    return response.data;
}

export async function registrationResendEmail(email: string) {
    const response = await api.post(endpoints.auth.registrationResend(), { email });
    return response.data;
}
