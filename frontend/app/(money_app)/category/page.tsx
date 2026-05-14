
import  Link  from "next/link";
import { GetCategoryList } from "@/app/(money_app)/actions";
import { CategoryAddForm } from "@/app/(money_app)/_components/CategoryAddForm";
import {category} from '../types'

export default async function CategoryPage() {

    const data = await GetCategoryList();
    const categories: category[] = await data;
    return (


        <div className="min-h-screen bg-gray-50 p-6">
            <div className="mx-auto max-w-4xl">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">カテゴリー管理</h1>
    
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <CategoryAddForm />
            </div>
    
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <ul>
                    {categories.map((category) => (
                        <Link key={category.uuid} href={`/category/${category.uuid}`} className="flex items-center gap-2 text-blue-500 hover:underline">
                            
                            <li key={category.uuid}>{category.name}</li>
                        </Link>
                    ))}
                </ul>
            </div>
            </div>
        </div>
    );
}
