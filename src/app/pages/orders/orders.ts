import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { IProduct } from '../../model/product/iproduct';
import { Product } from '../../service/product/product';
import { Order as OrdersService } from '../../service/orders/order';
import { CommonModule } from '@angular/common';
import { IOrder } from '../../model/order/icreate-order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.html',
  styleUrls: ['./orders.css'],
  imports: [CommonModule,ReactiveFormsModule]
})
export class Orders implements OnInit {
  private ordersService = inject(OrdersService);
  private fb = inject(FormBuilder);
  products: IProduct[] = [];

  successMessage: string = '';
  errorMessage: string = '';

  orderForm: FormGroup = this.fb.group({
    customerName: ['', Validators.required],
    notes: [''],
    orderLines: this.fb.array([])
  });

  constructor(private productService: Product) {}

  ngOnInit() {
    this.productService.getAll().subscribe({
      next: (response) => {
        this.products = response.data;
        console.log(response);
      }
    });

    // dynamic total calculation
    this.orderForm.valueChanges.subscribe(() => {
      console.log('Total price:', this.totalPrice);
    });
  }

  get orderLines(): FormArray {
    return this.orderForm.get('orderLines') as FormArray;
  }

  addOrderLine() {
    this.orderLines.push(
      this.fb.group({
        productId: [null, Validators.required],
        quantity: [1, [Validators.required, Validators.min(1)]]
      })
    );
  }

  removeOrderLine(index: number) {
    this.orderLines.removeAt(index);
  }

  get totalPrice(): number {
    return this.orderLines.value.reduce((sum: number, line: any) => {
      const product = this.products.find(p => p.id === line.productId);
      return sum + (product ? product.price * line.quantity : 0);
    }, 0);
  }

  onSubmit() {
    if (this.orderForm.invalid) return;

    const order = this.orderForm.value;
    this.ordersService.create(order).subscribe({
      next: (response) => {
        // this.orders.push(response); // live table update

        this.orderForm.reset();
        this.orderLines.clear();
        this.successMessage = 'تم استلام طلبكم بنجاح';
      },
      error: (response) => {
        var msg = response.error?.message;
        this.errorMessage = msg ? msg : 'حدث خطأ ما، يرجى المحاولة لاحقاً';
      }
    });
  }
}