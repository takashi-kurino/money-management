
import {TransactionList} from "./endpoints";
import Link from 'next/link';

interface transaction {
  uuid: string;
  type: string;
  store: string;
  total_price: number;
}

export default async function Page() {

  const transactions = await TransactionList();
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Transaction Page</h1>
      {/* <div className="bg-gray-200 p-4 rounded-lg">

        <pre>{JSON.stringify(transactions, null, 2)}</pre>
      </div> */}
      <ul>
      {transactions.map((transaction: transaction) => (
        <li key={transaction.uuid}>
          <Link href={`/transaction/${transaction.uuid}`}>{transaction.type}-{transaction.store}-{transaction.total_price}</Link>
        </li>
      ))}
    </ul>
    </div>
  );
}