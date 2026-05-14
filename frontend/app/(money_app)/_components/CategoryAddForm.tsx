'use client'
 
import { useActionState } from 'react'
import { PostCategory } from '@/app/(money_app)/actions'
 
const initialState = {
  message: "",
}
 
export function CategoryAddForm() {
  const [state, formAction, pending] = useActionState(PostCategory, initialState)
 
  return (
    <form action={formAction} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 ">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="name">カテゴリー名</label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            id="name"
            name="name"
            placeholder="カテゴリー名"
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
        <div>
          {state?.message && (
            <p aria-live="polite" className=" text-red-600 mt-2">
            {state.message}
            </p>
          )}
        
        </div>
        </div>
    </form>
  )
}