import { ApiResponse } from './../../model/product/iproduct';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICreateOrder, IOrder } from '../../model/order/icreate-order';

@Injectable({
  providedIn: 'root'
})
export class Order {
  private endpoint = 'http://localhost:5010/api/order'
  constructor(private http: HttpClient) {}
  
  create(product: ICreateOrder ) : Observable<ICreateOrder> {
      return this.http.post<ICreateOrder>(`${this.endpoint}/PlaceOrder`, product);
    }

  getAll(): Observable<ApiResponse<IOrder[]>> {
    return this.http.get<ApiResponse<IOrder[]>>(`${this.endpoint}/GetAllOrders`);
  }


}

