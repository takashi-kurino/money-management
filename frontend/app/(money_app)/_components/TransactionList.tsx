'use client'

import { useRouter } from 'next/navigation'
import { transaction } from '../types'

export function TransactionList({ transactions }: { transactions: transaction[] }) {
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
        {transactions.map((transaction: transaction) => (
          <tr key={transaction.uuid} 
            className="border-b border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={() => router.push(`/transaction/${transaction.uuid}`)}
          >
            <td className="px-6 py-4 text-sm text-gray-900">{transaction.date}</td>
            <td className="px-6 py-4 text-sm text-gray-900">{transaction.type}</td>
            <td className="px-6 py-4 text-sm text-gray-600">{transaction.store}</td>
            <td className="px-6 py-4 text-sm text-gray-600">{transaction.category?.name || '-'}</td>
            <td className="px-6 py-4 text-sm font-medium text-gray-900">¥{transaction.total_price.toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
    
  )
}
