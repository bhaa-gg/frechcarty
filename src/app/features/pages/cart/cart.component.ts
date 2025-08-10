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




  private readonly _cartService = inject(CartService)

  cart!: CartResponse

  ngOnInit(): void {
    this.getCart()
  }



  getCart() {
    return this._cartService.getCart().subscribe({
      next: (res) => {
        console.log({ cart: res });
        this.cart = res
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {

      }
    })
  }
  removeProductFromCart(id: string) {
    this._cartService.deleteProductFromCart(id).subscribe({
      next: (res) => {
        console.log(res);
        this.cart = res
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  updateCartCont(id: string, count: string) {
    this._cartService.updateCartQuantity(id, count).subscribe({
      next: (res) => {
        this.cart = res
      },
      error: (err) => {
        console.log(err);
      }
    })
  }




  clearCart() {
    this._cartService.clearCart().subscribe({
      next: (res) => {
        console.log(res);
        this.cart = res
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
