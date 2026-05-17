
export interface Category {
  uuid: string;
  name: string;
}

export interface Transaction {
  uuid: string;
  date: string;
  type: string;
  store: string;
  category: Category | null;
  total_price: number;
  created_at: string;
  updated_at: string;
}