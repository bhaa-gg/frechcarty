import { Component, Input } from '@angular/core';
import { Product } from '../../../interfaces/product';
import { CurrencyPipe } from '@angular/common';
import { CheckHideAuthDirective } from '../../../directives/check-hide-auth.directive';
import { RouterLink } from '@angular/router';
import { AddToWhichListComponent } from "../../business/add-to-which-list/add-to-which-list.component";
import { AddToCartBtnComponent } from "../../business/add-to-cart-btn/add-to-cart-btn.component";

@Component({
  selector: 'Eco-product-card',
  imports: [CurrencyPipe, CheckHideAuthDirective, RouterLink, AddToWhichListComponent, AddToCartBtnComponent],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {

  @Input({ required: true, alias: 'product' }) product !: Product | undefined
  
}
