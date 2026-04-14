// 'use client';

import { AddCategory } from "../endpoints";

export default function AddItemForm () {

  async function addCategory(formData: FormData) {
    'use server'
    await AddCategory(formData);
  }
  return (
    <>
      <form action={addCategory} className="mb-6 p-4 bg-blue-50 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">カテゴリ追加</h2>
          <div className="mb-6">
              <div className="flex gap-2 mb-2 p-2 border rounded">
                <input
                  type="text"
                  placeholder=""
                  name="name"
                  className="flex-1 px-2 py-1 border border-gray-300 rounded"
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