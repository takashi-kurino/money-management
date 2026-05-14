'use client'
 
import { DeleteTransaction } from '@/app/(money_app)/actions'
 
export function TransactionDeleteButton({ uuid }: { uuid: string }) {
 
  return (
    <form action={DeleteTransaction.bind(null, uuid)}>
      <button
        type="submit"
        className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
      >
        削除
      </button>
    </form>
  )
}