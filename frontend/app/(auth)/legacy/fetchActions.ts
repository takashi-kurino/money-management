// auth/actions.ts
"use server";
import endpoints from "@/lib/apiEndpoints";
import { serverFetchWithAuth } from "@/lib/serverFetchAuth";

type LoginUser = {
  username: string;
  password: string;
};

export async function getUser() {
  const res = await serverFetchWithAuth(endpoints.auth.user(), {
    method: "GET",
  });

  console.log("Server getUser response status:", res.status);
  if (!res.ok) return null;
  return res.json();
}

export async function loginUser(data: LoginUser) {
  const res = await serverFetchWithAuth(endpoints.auth.login(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("failed to create");
  }
  console.log("Server login response status:", res);

  return res.json();
}