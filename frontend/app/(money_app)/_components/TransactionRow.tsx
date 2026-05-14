'use client'

import { useRouter } from 'next/navigation'
import { transaction } from '../types'

export function TransactionRow({ transaction }: { transaction: transaction }) {
  const router = useRouter()
  const categoryLabel =
    transaction.category ? transaction.category.name : ''

  return (
    <tr
      className="border-b border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
      onClick={() => router.push(`/transaction/${transaction.uuid}`)}
    >
      <td className="px-6 py-4 text-sm text-gray-900">{transaction.type}</td>
      <td className="px-6 py-4 text-sm text-gray-600">{transaction.store}</td>
      <td className="px-6 py-4 text-sm text-gray-600">{categoryLabel}</td>
      <td className="px-6 py-4 text-sm font-medium text-gray-900">¥{transaction.total_price.toLocaleString()}</td>
    </tr>
  )
}
