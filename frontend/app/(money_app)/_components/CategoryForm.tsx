// CategoryForm.tsx
'use client'

import { useActionState } from 'react'
import { PostCategory, EditCategory } from '@/app/(money_app)/actions'
import { Category } from '../types'

const initialState = { message: '' }

type Props =
  | { mode: 'create' }
  | { mode: 'edit'; category: Category }
  | { mode: 'bulk_create'}

export function CategoryForm(props: Props) {
  const action =
    props.mode === 'edit'
      ? EditCategory.bind(null, props.category.uuid)
      : PostCategory

  const [state, formAction, pending] = useActionState(action, initialState)

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          カテゴリー名
        </label>
        <input
          type="text"
          id="name"
          name="name"           // ← "store" だったのを修正
          defaultValue={props.mode === 'edit' ? props.category.name : ''}
          placeholder="カテゴリー名"
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>

      {state?.message && (
        <p aria-live="polite" className="text-sm text-center text-red-600">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-md transition-colors"
      >
        {props.mode === 'edit' ? '更新' : '作成'}
      </button>
    </form>
  )
}