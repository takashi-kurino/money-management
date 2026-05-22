// TransactionForm.tsx
'use client'

import { useActionState } from 'react'
import { PostTransaction, PutTransaction } from '@/app/(money_app)/actions'
import { Transaction, Category } from '../types'

const initialState = { message: '' }

type Props =
  | { mode: 'create'; categories: Category[] }
  | { mode: 'edit'; uuid: string; transaction: Transaction; categories: Category[] }

export function TransactionForm(props: Props) {
  const action =
    props.mode === 'edit'
      ? PutTransaction.bind(null, props.uuid)
      : PostTransaction

  const [state, formAction, pending] = useActionState(action, initialState)

  const t = props.mode === 'edit' ? props.transaction : null

  return (
    <form action={formAction} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">

        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">日付*</label>
          <input
            type="date"
            id="date"
            name="date"
            defaultValue={t?.date ?? ''}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">収支*</label>
          <select
            id="type"
            name="type"
            defaultValue={t?.type ?? ''}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value=""></option>
            <option value="収入">収入</option>
            <option value="支出">支出</option>
          </select>
        </div>
        <div>
          <label htmlFor="total_price" className="block text-sm font-medium text-gray-700 mb-2">金額*</label>
          <input
            type="number"
            id="total_price"
            name="total_price"
            defaultValue={t?.total_price ?? ''}
            placeholder="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label htmlFor="store" className="block text-sm font-medium text-gray-700 mb-2">店舗・取引先</label>
          <input
            type="text"
            id="store"
            name="store"
            defaultValue={t?.store ?? ''}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">カテゴリ</label>
          <select
            id="category"
            name="category"
            defaultValue={t?.category?.uuid ?? ''}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value=""></option>
            {props.categories.map((category) => (
              <option key={category.uuid} value={category.uuid}>
                {category.name}
              </option>
            ))}
          </select>
        </div>


        <button
          type="submit"
          disabled={pending}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-md transition-colors"
        >
          
        {props.mode === 'create' 
          ? pending ? "作成中...":"作成"
          : pending ? "更新中...":"更新" 
        }
        </button>
      </div>

      {state?.message && (
        <p aria-live="polite" className="text-sm text-center text-green-600">
          {state.message}
        </p>
      )}

      {/* 編集モードのみ取引情報を表示 */}
      {props.mode === 'edit' && (
        <div className="bg-gray-50 rounded-md p-4 space-y-2">
          <h3 className="text-sm font-semibold text-gray-700">取引情報</h3>
          <dl className="text-sm text-gray-600 space-y-1">
            <div className="flex justify-between">
              <dt className="font-medium">作成日時:</dt>
              <dd>{props.transaction.created_at}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="font-medium">更新日時:</dt>
              <dd>{props.transaction.updated_at}</dd>
            </div>
          </dl>
        </div>
      )}
    </form>
  )
}