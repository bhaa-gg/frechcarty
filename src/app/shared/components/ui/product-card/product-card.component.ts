import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../interfaces/product';  
import { CurrencyPipe } from '@angular/common';
import { CheckHideAuthDirective } from '../../../directives/check-hide-auth.directive';
import { RouterLink } from '@angular/router';
import { AddToWhichListComponent } from "../../business/add-to-which-list/add-to-which-list.component";
import { AddToCartBtnComponent } from "../../business/add-to-cart-btn/add-to-cart-btn.component";

@Component({
  selector: 'Eco-product-card',
  imports: [CurrencyPipe, RouterLink, AddToWhichListComponent, AddToCartBtnComponent, CheckHideAuthDirective],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {

  @Input({ required: true, alias: 'product' }) product !: Product | undefined
  @Output() addToCartFire_2: EventEmitter<string> = new EventEmitter<string>();
  @Output() deleteFromCart_2: EventEmitter<string> = new EventEmitter<string>();

  @Output() addToWichListFire_2: EventEmitter<string> = new EventEmitter<string>();
  @Output() deleteFromWichListFire_2: EventEmitter<string> = new EventEmitter<string>();

  @Input() btnLoading: string = '';
  @Input() loadingBtnWish: string = '';
  @Input() showSide: boolean = true;
  @Input() inCart!: boolean
  @Input() inWish!: boolean 



  addToCart(id: string) {
    this.addToCartFire_2.emit(id);
  }
  deleteFromCart(id: string) {
    this.deleteFromCart_2.emit(id);
  }

  addToWichList(id: string) {
    this.addToWichListFire_2.emit(id);
  }
  deleteFromWichList(id: string) {
    this.deleteFromWichListFire_2.emit(id);
  }


}
