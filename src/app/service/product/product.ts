import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, ICreateProduct, IProduct } from '../../model/product/iproduct';

@Injectable({
  providedIn: 'root'
})
export class Product {
  private endpoint = 'http://localhost:5010/api/product'
  constructor(private http: HttpClient) {}

  create(product: ICreateProduct) : Observable<IProduct> {
    return this.http.post<IProduct>(`${this.endpoint}/AddProduct`, product);
  }

  getAll(): Observable<ApiResponse<IProduct[]>> {
    return this.http.get<ApiResponse<IProduct[]>>(`${this.endpoint}/GetAllProducts`)
  }

  update(id: number, product: ICreateProduct): Observable<any> {
    return this.http.put<any>(`${this.endpoint}/UpdateProduct/${id}`, product);
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.endpoint}/GetProductById/${id}`);
  }
delete(id: number) {
  return this.http.delete<{ success: boolean; message: string }>(`${this.endpoint}/DeleteProduct/${id}`);
}


}
