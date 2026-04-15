'use client';

import { AddItem } from "@/app/(money_app)/endpoints";

export default function AddItemForm ({ uuid }: { uuid: string }) {

  async function addItem(formData: FormData) {

    await AddItem(uuid, formData);
  }
  return (
    <>
      <form action={addItem} className="mb-6 p-4 bg-blue-50 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">アイテム追加</h2>
          <div className="mb-6">
              <div className="flex gap-2 mb-2 p-2 border rounded">
                <input
                  type="text"
                  placeholder="商品名"
                  name="name"
                  className="flex-1 px-2 py-1 border border-gray-300 rounded"
                />
                <input
                  type="number"
                  name="price"
                  placeholder="価格"
                  className="w-20 px-2 py-1 border border-gray-300 rounded"
                />
                <input
                  type="number"
                  name="amount"
                  placeholder="数量"
                  className="w-20 px-2 py-1 border border-gray-300 rounded"
                />
              </div>
          </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 my-4 rounded hover:bg-blue-600"
        >
          追加
        </button>
      </form>
    </>
  );
};