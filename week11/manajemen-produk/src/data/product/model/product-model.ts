export interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
}

export interface ProductPayload {
  name: string;
  price: number;
}