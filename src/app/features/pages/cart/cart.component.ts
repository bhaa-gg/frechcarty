import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../../shared/services/cart/cart.service';
import { CartResponse } from '../../../shared/interfaces/cart';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CheckoutComponent } from "../checkout/checkout.component";
import { RouterLink } from '@angular/router';


enum LoadingP {
  null = '',
  add = 'add',
  update = 'update',
  delete = 'delete',
  clear = 'clear',
  get = 'get'
}
@Component({
  selector: 'Eco-cart',
  imports: [CurrencyPipe, CheckoutComponent, CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  loading!: LoadingP
  loadingId!: string
  private readonly _cartService = inject(CartService)
  cart!: CartResponse
  ngOnInit(): void {
    this.getCart()
  }

  getCart() {
    this.loading = LoadingP.get
    this._cartService.getCart().subscribe({
      next: (res) => {
        console.log({ resCart: res });

        this.cart = res
        this.loading = LoadingP.null
      },
      error: (err) => {
        console.log(err);
        this.loading = LoadingP.null
      }
    })
    // this._cartService.cart$.subscribe({

    // })
  }
  removeProductFromCart(id: string) {
    this._cartService.deleteProductFromCart2(id).subscribe()

  }
  updateCartCont(id: string, count: string) {
    this.loading = LoadingP.update
    this.loadingId = id
    this._cartService.updateCartQuantity2(id, count).subscribe(
      {
        next: () => {
          this.loading = LoadingP.null
          this.loadingId = ''

        },
        error: () => {
          this.loading = LoadingP.null
          this.loadingId = ''

        }
      }
    )
  }




  clearCart() {
    this.loading = LoadingP.clear
    this._cartService.clearCart2().subscribe()
  }
}
