export interface IProduct {
  id: number;
  name: string;
  image: string | null;
  unit: string | null;
  price: number;
  stock: number;
  description: string | null;
  rack_location: string | null;
  is_active: boolean;
  uom?: {
    id: number;
    name: string;
    code: string;
  } | null;
  created_at: string;
  updated_at: string;
}

export interface IShopOrderItem {
  id: number;
  order_id: number;
  product_id: number;
  product_name: string;
  price: number;
  qty: number;
  subtotal: number;
}

export interface IShopOrder {
  id: number;
  order_code: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: string;
  note: string | null;
  total_amount: number;
  status: string;
  created_at: string;
  updated_at: string;
  items: IShopOrderItem[];
}
