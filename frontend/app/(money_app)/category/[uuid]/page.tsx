
import  EditCategoryForm  from "@/app/(money_app)/_components/EditCategory";
import  DeleteCategoryButton  from "@/app/(money_app)/_components/DeleteCategory";
import { CategoryDetail } from "@/app/(money_app)/endpoints";

export default async function CategoryEditPage({ params }: { params: Promise<{ uuid: string }> }) {
    const { uuid } = await params;
    const data = await CategoryDetail(uuid);

    return (
        <div className="p-6">
            <h1>Category Edit Page</h1>
            {data.name}
            <EditCategoryForm uuid={uuid} name={data.name}/>
            <DeleteCategoryButton category_uuid={uuid}/>
        </div>  
    );

}
