
// endpoints/todo.ts
import endpoints from '@/lib/apiEndpoints';


import { fetchWithAuth } from "@/lib/api";

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
    return await fetchWithAuth(endpoints.transactions.instance(uuid), {
        method: "DELETE",
    });
}

export default { TransactionList, TransactionDetail, AddTransaction, EditTransaction, DeleteTransaction };