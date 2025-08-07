import { Component, inject, Input } from '@angular/core';
import { CartService } from '../../../services/cart/cart.service';

@Component({
  selector: 'Eco-add-to-cart-btn',
  imports: [],
  templateUrl: './add-to-cart-btn.component.html',
  styleUrl: './add-to-cart-btn.component.css'
})

export class AddToCartBtnComponent {
  @Input() template !: "icon" | "Btn"
  @Input({ required: true }) productId !: string
  private _cartService = inject(CartService)

  btnLoading: boolean = false

  onClick() {
    this.btnLoading = true
    this._cartService.addProductToCart(this.productId).subscribe(
      {
        next: (res) => {
          console.log(res);
          this.btnLoading = false
        },
        error: (err) => {
          this.btnLoading = false
          console.log(err);
        },
        complete: () => {
          this.btnLoading = false
        }
      }
    )
  }
}
