'use client'

import { Transaction } from '../types'
import  Link  from 'next/link'

export function TransactionList({ transactions }: { transactions: Transaction[] }) {

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
            className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <td className="text-sm text-gray-900">
              <Link href={`/transaction/${t.uuid}`} className="block px-6 py-4">{t.date}</Link>
            </td>
            <td className="text-sm text-gray-900">
              <Link href={`/transaction/${t.uuid}`} className="block px-6 py-4">{t.type}</Link>
            </td>
            <td className="text-sm text-gray-600">
              <Link href={`/transaction/${t.uuid}`} className="block px-6 py-4">{t.store}</Link>
            </td>
            <td className="text-sm text-gray-600">
              <Link href={`/transaction/${t.uuid}`} className="block px-6 py-4">{t.category?.name || '-'}</Link>
            </td>
            <td className="text-sm font-medium text-gray-900">
              <Link href={`/transaction/${t.uuid}`} className="block px-6 py-4">¥{t.total_price.toLocaleString()}</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    
  )
}
