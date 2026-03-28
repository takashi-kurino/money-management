
import {TransactionDetail} from "../endpoints";
import DeleteTransaction from "../components/DeleteTransactioin";
import EditTransactionForm from "../components/EditTransaction";

export default async function Page({ params }: { params: Promise<{ uuid: string }> }) {

  const { uuid } = await params;
  const transaction = await TransactionDetail(uuid);

  return (
    
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Transaction Page</h1>
      {/* <div className="bg-gray-100 p-4 rounded-lg"> */}

        {/* <pre>{JSON.stringify(transaction, null, 2)}</pre> */}
      {/* </div> */}

      <EditTransactionForm uuid={uuid} transaction={transaction} />
      <DeleteTransaction uuid={uuid} />
    </div>
  );
}