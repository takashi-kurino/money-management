
import {GetTransactionList,GetCategoryList} from "@/app/(money_app)/actions";
import {TransactionAddForm }from "@/app/(money_app)/_components/TransactionAddForm";
import { TransactionRow } from "@/app/(money_app)/_components/TransactionRow";
import type { transaction } from "@/app/(money_app)/types";

export default async function Page() {

  const transactions = await GetTransactionList();
  const categories = await GetCategoryList();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">取引管理</h1>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <TransactionAddForm categories={categories} />
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">収支</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">店舗</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">カテゴリ</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">金額</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction: transaction) => (
                <TransactionRow key={transaction.uuid} transaction={transaction} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
        
  );
}