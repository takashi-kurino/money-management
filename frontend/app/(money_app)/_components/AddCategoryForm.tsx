'use client';

import { AddCategory } from "../endpoints";
import { useState } from 'react';

export default function AddItemForm () {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function addCategory(formData: FormData) {

    const {ok,status,data} =  await AddCategory(formData);
    console.log(ok, status,data); // デバッグ用ログ
    if (!ok) {
      if (status === 400 && data.non_field_errors) {
        setError(data.non_field_errors.join(", ")); // APIからのエラーメッセージを表示
        setSuccess(""); // 成功メッセージをクリア
      } else {
        setError("カテゴリの追加に失敗しました"); // 一般的なエラーメッセージ
        setSuccess(""); // 成功メッセージをクリア
      }
    } else {
      setSuccess("カテゴリが追加されました"); // 成功メッセージ
      setError(""); // エラーメッセージをクリア
    }
   
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
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
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