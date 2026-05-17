'use client'
 
import { DeleteTransaction,DeleteCategory } from '@/app/(money_app)/actions'
 
type Props =
| { mode: 'transaction', uuid: string }
| { mode: 'category' , uuid: string }

export function DeleteButton(props: Props) {
    
    const action =
    props.mode === 'transaction'
        ? DeleteTransaction.bind(null, props.uuid)
        : DeleteCategory.bind(null, props.uuid);
 
    return (
        <form action={action}>
        <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
        >
            削除
        </button>
        </form>
    )
}