
import {GetTransactionList,GetCategoryList} from "@/app/(money_app)/actions";
import {TransactionForm }from "@/app/(money_app)/_components/TransactionForm";
import { TransactionList } from "@/app/(money_app)/_components/TransactionList";

export default async function Page() {

  const transactions = await GetTransactionList();
  const categories = await GetCategoryList();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">取引管理</h1>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <TransactionForm mode="create" categories={categories} />
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <TransactionList transactions={transactions} />
        </div>
      </div>
    </div>
        
  );
}