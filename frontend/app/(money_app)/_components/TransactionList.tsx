'use client'

import { useRouter } from 'next/navigation'
import { Transaction } from '../types'

export function TransactionList({ transactions }: { transactions: Transaction[] }) {
  const router = useRouter()

  return (
    <table className="w-full">
      <thead className="bg-gray-100 border-b border-gray-200">
        <tr>
          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">日付</th>
          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">収支</th>
          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">店舗</th>
          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">カテゴリ</th>
          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">金額</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((t) => (
          <tr key={t.uuid} 
            className="border-b border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={() => router.push(`/transaction/${t.uuid}`)}
          >
            <td className="px-6 py-4 text-sm text-gray-900">{t.date}</td>
            <td className="px-6 py-4 text-sm text-gray-900">{t.type}</td>
            <td className="px-6 py-4 text-sm text-gray-600">{t.store}</td>
            <td className="px-6 py-4 text-sm text-gray-600">{t.category?.name || '-'}</td>
            <td className="px-6 py-4 text-sm font-medium text-gray-900">¥{t.total_price.toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
    
  )
}
