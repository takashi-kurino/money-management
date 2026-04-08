// components/deletetransaction.tsx
"use client";

import { DeleteItem } from "../endpoints";

interface DeleteItemProps {
    transaction_uuid: string;
    item_uuid: string;
}

export default function Deletetransaction({ transaction_uuid,item_uuid }: DeleteItemProps) {
  const handleDelete = async () => {
    await DeleteItem(transaction_uuid,item_uuid);
  };

  return (
    <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">
      削除
    </button>
  );
}