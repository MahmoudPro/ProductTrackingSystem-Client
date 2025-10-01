export interface ICreateOrder {
    customerName: string;
    notes : string;
    orderLines: IorderLine[];
}

export interface IorderLine{
    productId: number;
    quantity: number;
}

export interface IOrder {
    id: number;
    customerName: string;
    orderDate: Date;
    totalAmount: number;
    orderLines: IOrderLineDetails[];
}

export interface IOrderLineDetails {
    id: number;
    productId: number;
    productName: string;
    quantity: number;
    unitPrice: number;
    subTotal: number;
}
