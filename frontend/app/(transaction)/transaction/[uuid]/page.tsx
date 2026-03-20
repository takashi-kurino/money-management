
import {TransactionDetail} from "../endpoints";
import Deletetransaction  from "../components/deletetransaction";
import AddTransaction  from "../conponents/addtransaction";

export default async function Page({ params }: { params: Promise<{ uuid: string }> }) {

  const { uuid } = await params;
  const transactions = await TransactionDetail(uuid);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Transaction Page</h1>
      <div className="bg-gray-100 p-4 rounded-lg">

        <pre>{JSON.stringify(transactions, null, 2)}</pre>
      </div>
      <Deletetransaction uuid={uuid} />
    </div>
  );
}