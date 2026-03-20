
import {TransactionDetail} from "../endpoints";

interface items {
  uuid: string;
  type: string;
  store: string;
  total_price: number;
}

export default async function Page({ params }: { params: Promise<{ uuid: string }> }) {

  const { uuid } = await params;
  const transactions = await TransactionDetail(uuid);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Transaction Page</h1>
      <div className="bg-gray-100 p-4 rounded-lg">

        <pre>{JSON.stringify(transactions, null, 2)}</pre>
      </div>
    </div>
  );
}