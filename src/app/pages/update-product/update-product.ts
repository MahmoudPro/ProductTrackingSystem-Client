import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Product } from '../../service/product/product';
import { ICreateProduct } from '../../model/product/iproduct';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-product.html',
  styleUrls: ['./update-product.css']
})
export class UpdateProductComponent implements OnInit {
  productForm!: FormGroup;
  productId!: number;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private productService: Product,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      sku: ['', Validators.required],
      price: ['', Validators.required],
      stock: ['', Validators.required]
    });

    this.productId = Number(this.route.snapshot.paramMap.get('id'));

    this.productService.getById(this.productId).subscribe({
      next: (response) => {
        this.productForm.patchValue({
          name: response.data.name,
          sku: response.data.sku,
          price: response.data.price,
          stock: response.data.quantityInStock
        });
      }
    });
  }

  onSubmit() {
  if (this.productForm.invalid) return;

    const updatedProduct: ICreateProduct = {
    name: this.productForm.value.name,
    sku: this.productForm.value.sku,   // keep same SKU if user didn't change it
    price: this.productForm.value.price,
    quantityInStock: this.productForm.value.stock
  };

  this.productService.update(this.productId, updatedProduct).subscribe({
    next: () => {
      this.router.navigate(['/shop'], { queryParams: { updated: true } });
    },
    error: (err) => {
      console.error(err);
      alert('Update failed');
    }
  });
}

}
