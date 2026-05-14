
export interface categorytype {
  uuid: string;
  name: string;
}

export interface transactiontype {
  uuid: string;
  type: string;
  store: string;
  category: categorytype | null;
  total_price: number;
  created_at: string;
  updated_at: string;
}