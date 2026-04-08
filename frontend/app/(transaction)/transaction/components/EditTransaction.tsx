'use client';

import { EditTransaction } from "../endpoints";

interface Transaction {
    uuid: string;
    type: string;
    store: string;
    total_price: number;
    created_at: string;
}

interface EditTransactionFormProps {
    uuid: string;
    transaction: Transaction;
    item_length: number;
}

export default function EditTransactionForm({ uuid, transaction,item_length }: EditTransactionFormProps) {
    const handleSubmit = async (formData: FormData) => {
        await EditTransaction(uuid, formData);
    };
    return (
        <form action={handleSubmit} className="mb-6 p-4 bg-blue-50 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">取引編集</h2>
        <div className="space-y-4">
            <div>
            <label className="block text-sm font-medium mb-1">タイプ</label>
            <input
                type="text"
                name="type"
                required
                placeholder="例: 食費"
                defaultValue={transaction.type}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            </div>
            <div>
            <label className="block text-sm font-medium mb-1">店舗</label>
            <input
                type="text"
                name="store"
                required
                placeholder="例: スーパーA"
                defaultValue={transaction.store}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            </div>
            <div>
            <label className="block text-sm font-medium mb-1">金額</label>
            {item_length === 0 && (
            <input
                type="number"
                name="total_price"
                required
                step="1"
                defaultValue={transaction.total_price}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            )}
            {item_length > 0 && (
            <input
                type="number"
                name="total_price"
                required
                step="1"
                defaultValue={transaction.total_price}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                disabled
            />
            )}
            </div>
            <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
            編集
            </button>
        </div>
        </form>
    );
}

// itemが存在する場合、total_priceの入力を無効化するコードを追加
// item_lengthが0の場合は通常の入力フィールド、1以上の場合は入力不可のフィールドを表示するように条件分岐しています。
// これにより、itemが存在する場合はtotal_priceを直接編集できなくなります。
// もしitemが存在する場合、total_priceを編集したい場合は、itemを先に削除する必要があることをユーザーに伝えるためのUI/UXの工夫も検討すると良いでしょう。
