import { AddTransaction as addTransactionAction } from "../endpoints";

export default function AddTransactionForm() {

  return (
    <form action={addTransactionAction} className="mb-6 p-4 bg-blue-50 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">新規取引追加</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">タイプ</label>
          <input
            type="text"
            name="type"
            required
            placeholder="例: 食費"
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
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          追加
        </button>
      </div>
    </form>
  );
}