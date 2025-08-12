import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../../shared/services/cart/cart.service';
import { CartResponse } from '../../../shared/interfaces/cart';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'Eco-cart',
  imports: [CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {



  loading: boolean = false
  private readonly _cartService = inject(CartService)
  cart!: CartResponse
  ngOnInit(): void {
    this.getCart()

  }



  getCart() {
    this.loading = true
    this._cartService.getCart().subscribe()
    this._cartService.cart$.subscribe({
      next: (res) => {
        this.cart = res
      }
    })
  }
  removeProductFromCart(id: string) {
    // this.loading = true
    // this._cartService.deleteProductFromCart(id).subscribe({
    //   next: (res) => {
    //     console.log(res);
    //     this.cart = res
    //     this.loading = false
    //   },
    //   error: (err) => {
    //     console.log(err);
    //     this.loading = false
    //   }, complete: () => {
    //     this.loading = false
    //   }
    // })


    this._cartService.deleteProductFromCart2(id).subscribe()


  }
  updateCartCont(id: string, count: string) {
    this.loading = true
    this._cartService.updateCartQuantity2(id, count).subscribe(
      //   {
      //   next: (res) => {
      //     this.cart = res
      //     this.loading = false
      //   },
      //   error: (err) => {
      //     console.log(err);
      //     this.loading = false
      //   },
      //   complete: () => {
      //     this.loading = false
      //   }
      // }
    )
  }




  clearCart() {
    this.loading = true
    this._cartService.clearCart2().subscribe(
      //   {
      //   next: (res) => {
      //     console.log(res);
      //     this.cart = res
      //     this.loading = false
      //   },
      //   error: (err) => {
      //     console.log(err);
      //     this.loading = false
      //   },
      //   complete: () => {
      //     this.loading = false
      //   }
      // }
    )
  }
}
