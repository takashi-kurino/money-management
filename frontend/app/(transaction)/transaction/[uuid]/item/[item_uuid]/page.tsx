
import {ItemDetail} from "../../../endpoints";
import DeleteItem from "../../../components/DeleteItem";
import EditTransactionForm from "../../../components/EditTransaction";


export default async function ItemEditPage({ params }: { params: Promise<{ uuid: string ;item_uuid:string}> }) {

    const { uuid,item_uuid } = await params;
    const item = await ItemDetail(uuid,item_uuid);

    return (
        <div className="p-6">
            <h1>Item Edit Page</h1>
            <pre>{JSON.stringify(item, null, 2)}</pre>
            <label>uuid:{uuid}</label><br/>
            <label>item_uuid:{item_uuid}</label><br/>
            <DeleteItem transaction_uuid={uuid} item_uuid={item_uuid}/>
        </div>
    )
}

