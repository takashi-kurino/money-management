import {GetTransactionDetail,GetCategoryList} from "@/app/(money_app)/actions";
import {TransactionForm }from "@/app/(money_app)/_components/TransactionForm";
import { TransactionDeleteButton } from "@/app/(money_app)/_components/TransactionDeleteButton";

export default async function Page({ params }: { params: Promise<{ uuid: string }> }) {
  const { uuid } = await params;
  const transactiondetail = await GetTransactionDetail(uuid);
  const categories = await GetCategoryList();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">取引詳細</h1>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <TransactionForm mode="edit" uuid={uuid} transaction={transactiondetail} categories={categories} />

          <div className="mt-8 pt-6 border-t border-gray-200">
            <TransactionDeleteButton uuid={uuid} />
          </div>
        </div>
      </div>
    </div>
  );
}