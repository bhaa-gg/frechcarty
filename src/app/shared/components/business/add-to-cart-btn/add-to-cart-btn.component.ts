import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Input() btnLoading!: string

  @Input() inCart!: boolean


  @Output() addToCartFire_1: EventEmitter<string> = new EventEmitter<string>();

  @Output() deleteFromCart_1: EventEmitter<string> = new EventEmitter<string>();


  onClick() {
    this.inCart ? this.deleteFromCart_1.emit(this.productId) : this.addToCartFire_1.emit(this.productId)
  }

}
