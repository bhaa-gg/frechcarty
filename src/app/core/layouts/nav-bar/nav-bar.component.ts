import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../interfaces/auth-user';
import { AsyncPipe } from '@angular/common';
import { CheckHideAuthDirective } from '../../../shared/directives/check-hide-auth.directive';
import { CartService } from '../../../shared/services/cart/cart.service';
import { CartResponse } from '../../../shared/interfaces/cart';
import { UserDropDownComponent } from "../user-drop-down/user-drop-down.component";
import { WishlistService } from '../../../shared/services/Wishlist/wishlist.service';
import { WishlistComponent } from "../../../features/pages/wishlist/wishlist.component";
import { SearcgInputComponent } from "../../../features/pages/home/components/searcg-input/searcg-input.component";

@Component({
  selector: 'Eco-nav-bar',
  imports: [RouterLink, RouterLinkActive, SidebarComponent, AsyncPipe, UserDropDownComponent, WishlistComponent, SearcgInputComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit {
  UserData!: any
  private readonly _authService = inject(AuthService)
  private readonly _wishlistService = inject(WishlistService)
  private readonly _cartService = inject(CartService)
  cart!: CartResponse
  wishlistId!: string[];
  ngOnInit(): void {
    this.initCartAndWishlist()
    this.UserData = this._authService.authUser
    console.log({bhaaYse  : this.UserData});
    
  }


  initCartAndWishlist() {
    this._cartService.getCart().subscribe(res => {
      this.cart = res
    })
    this._wishlistService.getWishlist().subscribe(() => {
      this._wishlistService.WhishListData.subscribe(res => {
        this.wishlistId = res
      })
    })
  }

  signOut() {
    this._authService.logout()
  }


}
