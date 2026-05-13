'use client';
import { EditItem } from "@/app/(money_app)/endpoints" ;

interface Item {
  name: string;
  amount: number;
  price: number;
}

interface EditItemFormProps {
  transation_uuid: string;
  item_uuid: string;
  item: Item;
}

export default function EditItemForm ({ transation_uuid, item_uuid ,item}: EditItemFormProps) {

    const handleSubmit = async (formData: FormData) => {

        await EditItem(transation_uuid, item_uuid ,formData);
    }
  return (
    <>
      <form action={handleSubmit} className="mb-6 p-4 bg-blue-50 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">アイテム編集</h2>
          <div className="mb-6">
              <div className="flex gap-2 mb-2 p-2 border rounded">
                <input
                  type="text"
                  placeholder="商品名"
                  name="name"
                  defaultValue={item.name}
                  className="flex-1 px-2 py-1 border border-gray-300 rounded"
                />
                <input
                  type="number"
                  name="price"
                  placeholder="価格"
                  defaultValue={item.price}
                  className="w-20 px-2 py-1 border border-gray-300 rounded"
                />
                <input
                  type="number"
                  name="amount"
                  placeholder="数量"
                  defaultValue={item.amount}
                  className="w-20 px-2 py-1 border border-gray-300 rounded"
                />
              </div>
          </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 my-4 rounded hover:bg-blue-600"
        >
          編集
        </button>
      </form>
    </>
  );
};