export interface IProduct {
    id: number;
    name: string;
    sku: string;
    price: number;
    quantityInStock: number;
}

export interface ICreateProduct {
    name: string;
    sku: string;
    price: number;
    quantityInStock: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
export interface IUpdateProduct {
    
    name?: string;
    sku?: string;
    price?: number;
    quantityInStock?: number;
}
