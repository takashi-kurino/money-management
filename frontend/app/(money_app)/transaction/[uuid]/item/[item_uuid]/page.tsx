import {ItemDetail} from "../../../../endpoints";
import EditItemForm from "../../../../_components/EditItemForm";
import DeleteItem from "../../../../_components/DeleteItem";

export default async function ItemEditPage({ params }: { params: Promise<{ uuid: string ;item_uuid:string}> }) {

    const { uuid,item_uuid } = await params;
    const item = await ItemDetail(uuid,item_uuid);

    return (
        <>
            <div className="p-6">
                <h1>Item Edit Page</h1>
                <pre>{JSON.stringify(item, null, 2)}</pre>
                <label>uuid:{uuid}</label><br/>
                <label>item_uuid:{item_uuid}</label><br/>
                <EditItemForm transation_uuid={uuid} item_uuid={item_uuid} item={item}/>
                <DeleteItem transaction_uuid={uuid} item_uuid={item_uuid}/>
            </div>
        </>
    )
}

