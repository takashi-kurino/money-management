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
}

export default function EditTransactionForm({ uuid, transaction }: EditTransactionFormProps) {
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
            <input
                type="number"
                name="total_price"
                required
                step="0.01"
                placeholder="0.00"
                defaultValue={transaction.total_price}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
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