"use client";

import  Link  from "next/link";
import { EditCategory } from "@/app/(money_app)/endpoints";

export default function EditCategoryForm(data: { uuid: string , name: string }) {
    
    const handleSubmit = async (formData: FormData) =>{
        await EditCategory(data.uuid, formData);
    }

    return (
        <div className="p-6">

            <form action={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    defaultValue={data.name}
                    className="px-2 py-1 border border-gray-300 rounded"
                />
                <button
                    type="submit"
                    className="ml-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    編集
                </button>
            </form>
            <Link href="/transaction/category" className="text-blue-500 hover:underline mt-4 block">
                カテゴリ一覧へ戻る
            </Link> 
        </div>  
    );
}
