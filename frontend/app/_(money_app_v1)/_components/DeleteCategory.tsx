"use client";

import { DeleteCategory } from "@/app/(money_app_v1)/endpoints";

export default function DeleteCategoryButton({ category_uuid }: { category_uuid: string }) {
  const handleDelete = async () => {
    await DeleteCategory(category_uuid);
  };

  return (
    <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">
      削除
    </button>
  );
}