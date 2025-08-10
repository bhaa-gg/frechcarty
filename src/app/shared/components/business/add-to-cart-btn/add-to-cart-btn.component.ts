import { Component, EventEmitter, inject, Input, Output, output } from '@angular/core';
import { CartService } from '../../../services/cart/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'Eco-add-to-cart-btn',
  imports: [CommonModule],
  templateUrl: './add-to-cart-btn.component.html',
  styleUrl: './add-to-cart-btn.component.css'
})

export class AddToCartBtnComponent {
  @Input() template !: "icon" | "Btn"
  @Input({ required: true }) productId !: string
  private _cartService = inject(CartService)
  @Input() btnLoading!: string



  @Output() addToCartFire_1: EventEmitter<string> = new EventEmitter<string>();



  onClick() {
    this.addToCartFire_1.emit(this.productId)
  }
}
