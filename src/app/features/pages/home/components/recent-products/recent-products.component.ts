import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../../../../shared/services/product/product.service';
import { Product } from '../../../../../shared/interfaces/product';
import { ProductCardComponent } from "../../../../../shared/components/ui/product-card/product-card.component";

@Component({
  selector: 'Eco-recent-products',
  imports: [ProductCardComponent],
  templateUrl: './recent-products.component.html',
  styleUrl: './recent-products.component.css'
})
export class RecentProductsComponent implements OnInit {



  products !: Product[]

  private readonly _productService = inject(ProductService)
  constructor() { }


  getProducts() {
    return this._productService.getProducts().subscribe({
      next: (res) => {
        console.log(res);
        this.products = res.data
      },
      error(err) {
        console.log(err);
      },
      complete() {
      },
    })
  }

  ngOnInit(): void {
    this.getProducts()
  }

}
