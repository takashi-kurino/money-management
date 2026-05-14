// TransactionEditForm.tsx（Client Component）
'use client'

import { useActionState } from 'react'
import { EditCategory } from '@/app/(money_app)/actions'
import { category } from '../types'
const initialState = { message: '' }

export function CategoryEditForm({category}: {category: category}) {
    const boundAction = EditCategory.bind(null, category.uuid) // ここは適切なUUIDに置き換えてください
    const [state, formAction, pending] = useActionState(boundAction, initialState)
    return (
        <form action={formAction} className="space-y-4">
            <div>
                <label htmlFor="store" className="block text-sm font-medium text-gray-700 mb-2">
                    カテゴリー名
                </label>
                <input
                    type="text"
                    id="store"
                    name="store"
                    defaultValue={category?.name ?? ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                />
            </div>
            {state?.message && (
                <p aria-live="polite" className="text-sm text-center text-green-600">
                    {state.message}
                </p>
            )}

            <button
                type="submit"
                disabled={pending}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
                更新
            </button>

        </form>
    )
}