
import {TransactionDetail} from "../endpoints";
import DeleteTransaction from "../components/DeleteTransaction";
import EditTransactionForm from "../components/EditTransaction";


type Item = {
  uuid: string;
  name: string;
  amount: string;
  price: number;
};

export default async function Page({ params }: { params: Promise<{ uuid: string }> }) {

  const { uuid } = await params;
  const transaction = await TransactionDetail(uuid);
  const item : Item[] = await transaction.items;

  return (
    
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Transaction Page</h1>

      <EditTransactionForm uuid={uuid} transaction={transaction} />
      
        <ul>
          {item.map((item) => (
            
            <li key={item.uuid} className="mb-2">
              <strong>name:</strong> {item.name} 
              <strong>amount:</strong> {item.amount}
              <strong>price:</strong> {item.price}
            </li>
          ))}
        </ul>
      <DeleteTransaction uuid={uuid} />

    </div>
  );
}