'use client'
 
import { useActionState } from 'react'
import { TransactionAdd,CategoryList } from '@/app/(money_app)/actions'
 
const initialState = {
  message: "",
}

type Category = {
  uuid: string;
  name: string;
}
 
export function TransactionAddForm({ categories }: { categories: Category[] }) {
  const [state, formAction, pending] = useActionState(TransactionAdd, initialState)
 
  return (
    <form action={formAction} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="type">収支</label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            id="type"
            name="type"
            required
          >
            <option value="">選択してください</option>
            <option value="収入">収入</option>
            <option value="支出">支出</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="store">店舗・取引先</label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            type="text"
            id="store"
            name="store"
            placeholder="店舗・取引先名"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="category">カテゴリ</label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            id="category"
            name="category"
          >
            <option value="">選択してください</option>
            {categories.map((category: Category) => (
              <option key={category.uuid} value={category.uuid}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="total_price">金額</label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            type="number"
            id="total_price"
            name="total_price"
            placeholder="0"
            required
          />
        </div>

        <button
          type="submit"
          disabled={pending}
          className="md:col-span-3 lg:col-span-1 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-md transition-colors"
        >
          {pending ? "作成中..." : "作成"}
        </button>

      {state?.message && (
        <p aria-live="polite" className="text-sm text-center text-green-600 mt-2">
          {state.message}
        </p>
      )}
    </form>
  )
}