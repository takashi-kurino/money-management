'use client'

import { useRouter } from 'next/navigation'

interface Category {
  uuid: string
  name: string
}

interface Transaction {
  uuid: string
  type: string
  store: string
  category: Category | null
  total_price: number
  created_at: string
}


export function TransactionRow({ transaction }: { transaction: Transaction }) {
  const router = useRouter()
  const categoryLabel =
    typeof transaction.category === 'string'
      ? transaction.category
      : transaction.category?.name ?? '未分類'

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
