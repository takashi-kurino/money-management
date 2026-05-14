
export interface category {
  uuid: string;
  name: string;
}

export interface transaction {
  uuid: string;
  type: string;
  store: string;
  category: category | null;
  total_price: number;
  created_at: string;
  updated_at: string;
}