import { Component, OnInit, signal } from '@angular/core';
import { ICreateProduct, IProduct } from '../../model/product/iproduct';
import { Product } from '../../service/product/product';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shop',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './shop.html',
  styleUrl: './shop.css'
})
export class Shop implements OnInit{
  products = signal<IProduct[]>([]);
  successMessage: string = '';
  productForm!: FormGroup;

  constructor(private productService: Product, private fb: FormBuilder,private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      sku: ['', Validators.required],
      price: ['', Validators.required],
      stock: ['', Validators.required]
    })

    this.loadProducts();

    this.route.queryParams.subscribe(params => {
    if (params['updated']) {
      this.showSuccessMessage('Product updated successfully!');
    }
  });
    
  }

  loadProducts(){
    this.productService.getAll().subscribe({
      next: (response) => {
        this.products.set(response.data);
        console.log(response);
      }
    });
  }

  onSubmit() {
    const newProduct : ICreateProduct = {
      name: this.productForm.value.name,
      sku: this.productForm.value.sku,
      price: this.productForm.value.price,
      quantityInStock: this.productForm.value.stock
    };
    this.productService.create(newProduct).subscribe({
      next: (response) => {
        alert(`Product ${response.name} created successfully`);
        this.loadProducts();
      },
      error: (response) => {
        var msg = response.error?.message;
        alert(msg);
      }
    })
  }

  deleteProduct(id: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.delete(id).subscribe({
        next: (response) => {
          this.showSuccessMessage('Product deleted successfully!');
          this.products.update((list) => list.filter(p => p.id !== id));
        },
        error: () => {
            alert('Delete failed');
        }
      });
    }
  }

  private showSuccessMessage(message: string) {
    this.successMessage = message;
    setTimeout(() => {
      this.successMessage = '';
    }, 300);
  }


}
