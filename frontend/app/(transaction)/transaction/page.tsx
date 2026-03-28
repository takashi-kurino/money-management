
import {TransactionList} from "./endpoints";
import AddTransactionForm from "./components/AddTransaction";
import Link from 'next/link';

interface transaction {
  uuid: string;
  type: string;
  store: string;
  total_price: number;
  created_at: string;
}

export default async function Page() {

  const transactions = await TransactionList();
  
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Transaction Page</h1>
      <AddTransactionForm />
      <ul>
      {transactions.map((transaction: transaction) => (
        <li key={transaction.uuid}>
          <Link href={`/transaction/${transaction.uuid}`}>{transaction.created_at}-{transaction.type}-{transaction.store}-{transaction.total_price}</Link>

        </li>
      ))}
    </ul>
    </div>
  );
}