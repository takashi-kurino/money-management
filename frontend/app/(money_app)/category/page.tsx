
import  Link  from "next/link";
import { CategoryList } from "../endpoints";
import AddCategoryForm  from "../_components/AddCategoryForm";

type Category = {
    uuid: string;
    name: string;
};

export default async function CategoryPage() {
    const data = await CategoryList();
    const categories: Category[] = await data;
    return (
        <div className="p-6">
            <h1>Category Page</h1>
            <AddCategoryForm />
            <ul>
                {categories.map((category) => (
                    <Link key={category.uuid} href={`/transaction/category/${category.uuid}`} className="flex items-center gap-2 text-blue-500 hover:underline">
                        
                        <li key={category.uuid}>{category.uuid}{category.name}</li>
                    </Link>
                ))}
            </ul>
        </div>
    );
}
