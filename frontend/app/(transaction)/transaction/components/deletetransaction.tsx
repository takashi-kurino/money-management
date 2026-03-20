// components/deletetransaction.tsx
"use client";

import { DeleteTransaction } from "../endpoints";

export default function Deletetransaction({ uuid }: { uuid: string }) {
  const handleDelete = async () => {
    if (!confirm("削除しますか？")) return;
    await DeleteTransaction(uuid);
  };

  return (
    <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">
      削除
    </button>
  );
}