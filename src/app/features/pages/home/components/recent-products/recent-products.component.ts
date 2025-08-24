import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../../../../shared/services/product/product.service';
import { Product } from '../../../../../shared/interfaces/product';
import { ProductCardComponent } from "../../../../../shared/components/ui/product-card/product-card.component";
import { CartService } from '../../../../../shared/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../../../../shared/services/Wishlist/wishlist.service';

@Component({
  selector: 'Eco-recent-products',
  imports: [ProductCardComponent],
  templateUrl: './recent-products.component.html',
  styleUrl: './recent-products.component.css'
})
export class RecentProductsComponent implements OnInit {
  products !: Product[]
  loadingBtn: string = ''
  loadingBtnWish: string = ''
  private readonly _productService = inject(ProductService)
  private readonly _cartService = inject(CartService)
  private readonly _wishlistService = inject(WishlistService)
  cartIds!: string[]
  wishlistIds!: string[]



  private readonly _toaster = inject(ToastrService)
  constructor() { }



  ngOnInit(): void {
    this.getProducts()
    this.getItemInCart()
    this.getWishlistItems()
  }

  getProducts() {
    return this._productService.getProducts({}).subscribe({
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
  getItemInCart() {
    this._cartService.cart$.subscribe({
      next: (res) => {
        this.cartIds = res.data.products.map((item: any) => item.product._id || item.product)
        console.log({ cartIds: this.cartIds });
      }
    })
  }


  getWishlistItems() {
    this._wishlistService.WhishListData.subscribe({
      next: (res) => {
        this.wishlistIds = res
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
          this._toaster.success(res.message, '', {
            messageClass: 'text-sm font-semibold ',
          });

          //           this._toaster.success(
          //             `
          // <div class="flex items-center justify-center">
          // <img src="https://www.svgrepo.com/show/533814/honey.svg" class="size-12" alt="icon" />
          //     <p class="text-sm font-semibold " >${res.message}</p>
          // </div>`,
          //             '',
          //             {
          //               enableHtml: true,
          //               toastClass: 'ngx-toastr bg-none custom-toast', // override default class
          //             }
          //           );
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
