
import {TransactionDetail} from "../endpoints";
import AddItemForm from "../components/AddItemForm";
import DeleteTransaction from "../components/DeleteTransaction";
import EditTransactionForm from "../components/EditTransaction";
import Link from "next/link";

type Item = {
  uuid: string;
  name: string;
  amount: string;
  price: number;
};

export default async function TransactionEditPage({ params }: { params: Promise<{ uuid: string }> }) {

  const { uuid } = await params;
  const transaction = await TransactionDetail(uuid);
  const item : Item[] = await transaction.items;

  return (
    <>  
      <h1 className="text-2xl font-bold mb-4 p-4">Transaction Edit Page</h1>
      <div className="flex justify-center ">


        <div className="min-w-3/4 max-w-3/4">

          <EditTransactionForm uuid={uuid} transaction={transaction} item_length={item.length}/>
          <AddItemForm uuid={uuid} />
        
        </div>
        

      </div>
      <div className="p-4">
      <ul>
            {item.map((item) => (
              <li key={item.uuid} className="mb-2">

                <Link href={`/transaction/${transaction.uuid}/item/${item.uuid}`}>
                  <strong>name:</strong> {item.name} 
                  <strong>amount:</strong> {item.amount}
                  <strong>price:</strong> {item.price}
                </Link>
                  
                
              </li>
            ))}
          </ul>
          <DeleteTransaction uuid={uuid} />

      </div>

    </>
  );
}