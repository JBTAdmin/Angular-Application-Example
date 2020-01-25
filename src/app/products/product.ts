/* Defines the product entity */
export interface Product {
  id: number;
  productName: string;
  productCode?: string;
  description?: string;
  price?: number;
  quantityInStock?: number;
  category: string;
  supplier: number;
  searchKey?: string[];
}

export interface ProductResult {
  totalCount: number;
  items: Product[];
}

export interface ProductResolved {
  product: Product;
  error?: any;
}
