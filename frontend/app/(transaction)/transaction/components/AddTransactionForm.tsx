'use client';

import { useState, useCallback } from 'react';
import { AddTransactionWithItems } from "../endpoints";

// フォームアイテムの型定義
type FormItem = {
  id: number;
  name: string;
  price: string;
  amount: string;
};

export default function AddTransactionForm() {
  // 取引フォームの状態
  const [type, setType] = useState('');
  const [inputMode, setInputMode] = useState(''); // '合計金額' or '詳細登録'
  const [store, setStore] = useState('');
  const [totalPrice, setTotalPrice] = useState(''); // 合計金額入力用

  // アイテムフォームの状態
  const [items, setItems] = useState<FormItem[]>([]);
  const [idCounter, setIdCounter] = useState<number>(1);

  // アイテムを追加する関数
  const addItem = () => {
    const newItem: FormItem = {
      id: idCounter,
      name: "",
      price: "",
      amount: "",
    };
    setIdCounter(prevId => prevId + 1);
    setItems(prevItems => [...prevItems, newItem]);
  };

  // アイテムを削除する関数
  const deleteItem = (id: number) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  // アイテムの入力値を変更する関数
  const handleItemChange = useCallback(
    (id: number, key: keyof FormItem) => 
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setItems(prevItems => 
          prevItems.map(item => 
            item.id === id ? {...item, [key]: e.target.value} : item
          )
        );
    },
    []
  );

  // フォーム送信処理
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let data: any = {
      type,
      store,
    };

    // inputMode に応じてデータを分岐
    if (inputMode === '詳細登録') {
      // 詳細登録：アイテムを数値に変換
      const convertedItems = items.map(item => ({
        name: item.name,
        price: parseFloat(item.price) || 0,
        amount: parseFloat(item.amount) || 0,
      }));
      data.items = convertedItems;
    } else if (inputMode === '合計金額') {
      // 合計金額：合計金額のみ
      data.total_price = parseFloat(totalPrice) || 0;
    }

    console.log('送信データ:', data);

    try {
      // API に送信
      await AddTransactionWithItems(data);
      
      // 送信後、フォームをリセット
      setType('');
      setInputMode('');
      setStore('');
      setItems([]);
      setIdCounter(1);
      setTotalPrice('');
      
    } catch (error) {
      console.error('送信エラー:', error);
      alert('エラーが発生しました');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 bg-blue-50 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">新規取引追加</h2>
      
      {/* 取引種別と入力方法 */}
      <div className="space-y-4 mb-6 pb-6 border-b">
        <div>
          <label className="block text-sm font-medium mb-2">取引タイプ</label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                setType('収入');
                setInputMode('合計金額');
              }}
              className={`flex-1 py-2 rounded font-medium transition ${
                type === '収入' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              収入
            </button>
            <button
              type="button"
              onClick={() => {
                setType('支出');
                setInputMode('');
              }}
              className={`flex-1 py-2 rounded font-medium transition ${
                type === '支出' 
                  ? 'bg-red-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              支出
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">店舗</label>
          <input
            type="text"
            value={store}
            onChange={(e) => setStore(e.target.value)}
            required
            placeholder="例: スーパーA"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {type === '支出' && (
          <div>
            <label className="block text-sm font-medium mb-2">入力方法</label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setInputMode('合計金額')}
                className={`flex-1 py-2 rounded font-medium transition ${
                  inputMode === '合計金額' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                合計金額のみ
              </button>
              <button
                type="button"
                onClick={() => setInputMode('詳細登録')}
                className={`flex-1 py-2 rounded font-medium transition ${
                  inputMode === '詳細登録' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                詳細登録
              </button>
            </div>
          </div>
        )}

      </div>

      {/* 合計金額のみ */}
      {inputMode === '合計金額' && (
        <div>
          <label className="block text-sm font-medium mb-1">合計金額</label>
          <input
            type="number"
            value={totalPrice}
            onChange={(e) => setTotalPrice(e.target.value)}
            required
            placeholder="例: 100000"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
      )}

      {/* 詳細登録：商品一覧 */}
      {inputMode === '詳細登録' && (
        <div className="mb-6">
          <h3 className="text-md font-semibold mb-4">商品一覧</h3>
          
          {/* アイテム追加ボタン */}
          <button
            type="button"
            onClick={addItem}
            className="mb-4 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
          >
            商品を追加
          </button>

          {/* アイテムのリスト */}
          {items.map((item) => (
            <div key={item.id} className="flex gap-2 mb-2 p-2 border rounded">
              <input
                type="text"
                placeholder="商品名"
                value={item.name}
                onChange={handleItemChange(item.id, 'name')}
                className="flex-1 px-2 py-1 border border-gray-300 rounded"
              />
              <input
                type="number"
                placeholder="価格"
                value={item.price}
                onChange={handleItemChange(item.id, 'price')}
                className="w-20 px-2 py-1 border border-gray-300 rounded"
              />
              <input
                type="number"
                placeholder="数量"
                value={item.amount}
                onChange={handleItemChange(item.id, 'amount')}
                className="w-20 px-2 py-1 border border-gray-300 rounded"
              />
              <button
                type="button"
                onClick={() => deleteItem(item.id)}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              >
                削除
              </button>
            </div>
          ))}
        </div>
      )}

      {/* プレビュー */}
      {/* {inputMode && (
        <div className="mb-6 p-3 bg-gray-100 rounded">
          <p className="text-sm font-semibold mb-2">送信データプレビュー:</p>
          <pre className="text-xs overflow-auto">
            {JSON.stringify(
              inputMode === '詳細登録'
                ? {
                    type,
                    store,
                    items: items.map(item => ({
                      name: item.name,
                      price: parseFloat(item.price) || 0,
                      amount: parseFloat(item.amount) || 0,
                    }))
                  }
                : {
                    type,
                    store,
                    total_price: parseFloat(totalPrice) || 0,
                  },
              null,
              2
            )}
          </pre>
        </div>
      )} */}

      {/* 送信ボタン */}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white px-4 py-2 my-4 rounded hover:bg-blue-600"
      >
        取引を追加
      </button>
    </form>
  );
}