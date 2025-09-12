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
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../../shared/services/Wishlist/wishlist.service';
import { LoadingComponent } from "../../../shared/components/ui/loading/loading.component";

@Component({
  selector: 'Eco-products-details',
  imports: [CarouselModule, CommonModule, AddToWhichListComponent, AddToCartBtnComponent, RelateProductsComponent, LoadingComponent],
  templateUrl: './products-details.component.html',
  styleUrl: './products-details.component.css'
})
export class ProductsDetailsComponent implements OnInit {
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _productService = inject(ProductService);
  private readonly _wishlistService = inject(WishlistService)

  inCart!: boolean
  inWish!: boolean
  private readonly _cartService = inject(CartService)
  loadingBtn: string = ''
  private readonly _toaster = inject(ToastrService)

  loadingBtnWish: string = ''

  theProduct!: Product
  API_ERROR: boolean = false
  loading!: boolean 
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
  getItemInCart(id: string) {
    this._cartService.cart$.subscribe({
      next: (res) => {
        this.inCart = res.data.products.find((item: any) => id == item.product._id || id == item.product)
      }
    })
  }

  getId() {
    this._activatedRoute.paramMap.subscribe({
      next: (res) => {
        this.theProductId = res.get('id')!
        this.getProdDetails(this.theProductId)
        this.getItemInCart(this.theProductId)
      }
    })
    this._wishlistService.WhishListData.subscribe({
      next: (res) => {
        this.inWish = res.includes(this.theProductId)
      }
    })
  }


  getProdDetails(id: string) {
    this.loading = true
    this._productService.getProductsById(id).subscribe({
      next: (res) => {

        this.theProduct = res.data
        this.theProductImgs = [...res.data.images, res.data.imageCover]
        if (!this.theRelatedProducts.length || !this.theRelatedProducts)
          this.getRelatedProds(res?.data?.category._id)

        this.loading = false
      }, error: (err) => {
        console.log(err);
        this.loading = false
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
    this._cartService.addProductToCart2(id).subscribe(
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

  removeProductFromCart(id: string) {
    this.loadingBtn = id
    this._cartService.deleteProductFromCart2(id).subscribe(
      {
        next: (res) => {
          console.log(res);
          this.loadingBtn = ''
          this._toaster.info("Product removed from cart", '', {
            messageClass: 'text-sm font-semibold ',
          });
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

  addToWishlist(id: string) {
    this.loadingBtnWish = id + ''
    this._wishlistService.addToWishlist(id).subscribe({
      next: (res) => {
        console.log(res);
        this.loadingBtnWish = ''
      },
      error: (err) => {
        console.log(err);
        this.loadingBtnWish = ''
      },
      complete: () => {
        this.loadingBtnWish = ''
      },
    })
  }
  delFromWishlist(id: string) {
    this.loadingBtnWish = id + ''
    this._wishlistService.removeFromWishlist(id).subscribe({
      next: (value) => {
        this.loadingBtnWish = ''
      }, error: (err) => {
        console.log(err);
        this.loadingBtnWish = ''
      },
      complete: () => {
        this.loadingBtnWish = ''
      },
    })
  }



}
