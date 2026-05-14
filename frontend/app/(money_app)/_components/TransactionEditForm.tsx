// TransactionEditForm.tsx（Client Component）
'use client'

import { useActionState } from 'react'
import { PutTransaction } from '@/app/(money_app)/actions'
import { transaction,category } from '../types'
const initialState = { message: '' }

export function TransactionEditForm({
    uuid,
    transaction,
    categories
}: {
    uuid: string
    transaction: transaction
    categories: category[]
}) {
    const boundAction = PutTransaction.bind(null, uuid)
    const [state, formAction, pending] = useActionState(boundAction, initialState)

    return (
        <form action={formAction} className="space-y-6">
            <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                    収支
                </label>
                <select
                    id="type"
                    name="type"
                    defaultValue={transaction?.type ?? ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                >
                    <option value="収入">収入</option>
                    <option value="支出">支出</option>
                </select>
            </div>

            <div>
                <label htmlFor="store" className="block text-sm font-medium text-gray-700 mb-2">
                    店舗・取引先
                </label>
                <input
                    type="text"
                    id="store"
                    name="store"
                    defaultValue={transaction?.store ?? ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                />
            </div>

            <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                    カテゴリ
                </label>
                <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    id="category"
                    name="category"
                    defaultValue={transaction?.category?.uuid ?? ''}
                >
                    <option value=""></option>
                    {categories.map((category: category) => (
                    <option key={category.uuid} value={category.uuid}>
                        {category.name}
                    </option>
                    ))}
                </select>
            </div>
            
            <div>
                <label htmlFor="total_price" className="block text-sm font-medium text-gray-700 mb-2">
                    金額
                </label>
                <input
                    type="number"
                    id="total_price"
                    name="total_price"
                    defaultValue={transaction?.total_price ?? ''}
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

            <div className="bg-gray-50 rounded-md p-4 space-y-2">
                <h3 className="text-sm font-semibold text-gray-700">取引情報</h3>
                <dl className="text-sm text-gray-600 space-y-1">
                    <div className="flex justify-between">
                        <dt className="font-medium">作成日時:</dt>
                        <dd>{transaction?.created_at}</dd>
                    </div>
                    <div className="flex justify-between">
                        <dt className="font-medium">更新日時:</dt>
                        <dd>{transaction?.updated_at}</dd>
                    </div>
                </dl>
            </div>
        </form>
    )
}