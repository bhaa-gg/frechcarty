import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterEvent } from '@angular/router';
import { ProductService } from '../../../shared/services/product/product.service';
import { Product } from '../../../shared/interfaces/product';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CommonModule } from '@angular/common';
import { AddToWhichListComponent } from "../../../shared/components/business/add-to-which-list/add-to-which-list.component";
import { AddToCartBtnComponent } from "../../../shared/components/business/add-to-cart-btn/add-to-cart-btn.component";
import { RelateProductsComponent } from "./components/relate-products/relate-products.component";
import { CartService } from '../../../shared/services/cart/cart.service';

@Component({
  selector: 'Eco-products-details',
  imports: [CarouselModule, CommonModule, AddToWhichListComponent, AddToCartBtnComponent, RelateProductsComponent],
  templateUrl: './products-details.component.html',
  styleUrl: './products-details.component.css'
})
export class ProductsDetailsComponent implements OnInit {
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _productService = inject(ProductService);

  private readonly _cartService = inject(CartService)
  loadingBtn: string = ''


  theProduct!: Product
  API_ERROR: boolean = false
  theRelatedProducts: Product[] = []
  theProductImgs!: string[]
  theProductId!: string
  readonly customOptions: OwlOptions = {
    loop: true,
    margin: 16,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    smartSpeed: 800,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    nav: false,
    dotsData: true, // Enable custom dot content
    responsive: {
      0: { items: 1 },
      400: { items: 1 },
      740: { items: 1 },
      940: { items: 1 },
      1200: { items: 1 }
    }
  };

  ngOnInit(): void {
    this.getId()
  }


  getId() {
    this._activatedRoute.paramMap.subscribe({
      next: (res) => {
        this.theProductId = res.get('id')!
        this.getProdDetails(this.theProductId)
      }
    })
  }


  getProdDetails(id: string) {
    this._productService.getProductsById(id).subscribe({
      next: (res) => {
        this.theProduct = res.data
        this.theProductImgs = [...res.data.images, res.data.imageCover]
        if (!this.theRelatedProducts.length || !this.theRelatedProducts)
          this.getRelatedProds(res?.data?.category._id)
      }, error: (err) => {
        console.log(err);

        this.API_ERROR = true
      }
    })
  }

  getDotImage(img: string): string {
    return `<img src="${img}" class="dot-image" alt="Dot Image">`;
  }

  getRelatedProds(id: string) {
    this._productService.getProductsByCategoryId(id).subscribe({
      next: (res) => {
        this.theRelatedProducts = res.data
      },
      error(err) {
        console.log(err);
      }
    })
  }
  addToCart(id: string) {
    this.loadingBtn = id
    this._cartService.addProductToCart(id).subscribe(
      {
        next: (res) => {
          console.log(res);
          this.loadingBtn = ''
        },
        error: (err) => {
          this.loadingBtn = ''
          console.log(err);
        },
        complete: () => {
          this.loadingBtn = ''
        }
      }
    )
  }
}
