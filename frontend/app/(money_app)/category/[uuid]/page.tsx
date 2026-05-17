import { GetCategoryDetail } from "@/app/(money_app)/actions";
import { CategoryDeleteButton } from "@/app/(money_app)/_components/CategoryDeleteButton";
import { CategoryForm } from "@/app/(money_app)/_components/CategoryForm";

export default async function CategoryEditPage({ params }: { params: Promise<{ uuid: string }> }) {
    const { uuid } = await params;
    const data = await GetCategoryDetail(uuid);

    return (

        <div className="min-h-screen bg-gray-50 p-6">
            <div className="mx-auto max-w-2xl">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">カテゴリー編集</h1>
                <div className="bg-white rounded-lg shadow-sm p-6">

                    <CategoryForm mode="edit" category={data} />
                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <CategoryDeleteButton uuid={uuid}/>
                    </div>
                </div>
            </div>
        </div>
    );

}
