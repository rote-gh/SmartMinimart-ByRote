export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  imageUrl: string;
  barcode?: string;
  soldCount?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface TransactionItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  total: number;
}

export interface Transaction {
  id: string; // e.g. "TRX-9012"
  dateTime: string; // ISO date-time string or readable time like "14:30 น."
  dateStr: string; // e.g. "2026-05-30" or "24 พ.ค."
  items: TransactionItem[];
  totalAmount: number;
  itemCount: number;
}
