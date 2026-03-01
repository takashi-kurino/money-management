// endpoints/todo.ts
import endpoints from '@/lib/apiEndpoints';


import { fetchWithAuth } from "@/lib/api";

export async function CategoryList() {
    return await fetchWithAuth(endpoints.categories.list());
}

export async function CategoryDetail(uuid: string) {
    return await fetchWithAuth(endpoints.categories.instance(uuid));
}

export async function AddCategory(name: string) {
    return await fetchWithAuth(endpoints.categories.list(), {
        method: "POST",
        body: JSON.stringify({ name }),
    });
}

export async function EditCategory(uuid: string, name: string) {
    return await fetchWithAuth(endpoints.categories.instance(uuid), {
        method: "PUT",
        body: JSON.stringify({ name }),
    });
}

export async function DeleteCategory(uuid: string) {
    return await fetchWithAuth(endpoints.categories.instance(uuid), {
        method: "DELETE",
    });
}

export default { CategoryList, CategoryDetail, AddCategory, EditCategory, DeleteCategory };