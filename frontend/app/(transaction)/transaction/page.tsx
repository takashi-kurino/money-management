
import {TransactionList} from "./endpoints";


export default async function Page() {

  const transactions = await TransactionList();
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Transaction Page</h1>
      <p>This is the transaction page. You can manage your transactions here.</p>
      <div className="bg-gray-800 p-4 rounded-lg">

        <pre>{JSON.stringify(transactions, null, 2)}</pre>
      </div>
    </div>
  );
}