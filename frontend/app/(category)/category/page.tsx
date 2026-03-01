
import {CategoryList} from "./endpoints";


export default async function Page() {
  const categories = await CategoryList();
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Category Page</h1>
      <p>This is the category page. You can manage your categories here.</p>
      <div className="bg-gray-800 p-4 rounded-lg">

        <pre>{JSON.stringify(categories, null, 2)}</pre>
      </div>
    </div>
  );
}