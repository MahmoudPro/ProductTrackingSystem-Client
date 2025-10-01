import { Component, OnInit, signal } from '@angular/core';
import { Order } from '../../service/orders/order';
import { IOrder } from '../../model/order/icreate-order';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reports',
  imports: [CommonModule],
  templateUrl: './reports.html',
  styleUrl: './reports.css'
})
export class Reports implements OnInit{
  orders = signal<IOrder[]>([]);
  constructor(private orderService: Order) {}

  ngOnInit(): void {
    this.orderService.getAll().subscribe({
      next: (response) => {
        this.orders.set(response.data);
        console.log(response)
      }
    });
  }

}
