
import { GetCategoryList } from "@/app/(money_app)/actions";
import { CategoryForm } from "@/app/(money_app)/_components/CategoryForm";
import { Category } from '../types'
import CategoryList from "../_components/CategoryList";

export default async function CategoryPage() {

  const data = await GetCategoryList();
  const categories: Category[] = await data;
  return (

    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">カテゴリー管理</h1>
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            
          <CategoryForm mode="create" />
        </div>
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <CategoryList categories={categories} />
        </div>
      </div>
    </div>
  );
}
