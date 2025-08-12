import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../interfaces/auth-user';
import { AsyncPipe } from '@angular/common';
import { CheckHideAuthDirective } from '../../../shared/directives/check-hide-auth.directive';
import { CartService } from '../../../shared/services/cart/cart.service';
import { CartResponse } from '../../../shared/interfaces/cart';

@Component({
  selector: 'Eco-nav-bar',
  imports: [RouterLink, RouterLinkActive, SidebarComponent, AsyncPipe],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit {
  UserData!: any
  private readonly _authService = inject(AuthService)
  private readonly _cartService = inject(CartService)
  cart!: CartResponse

  ngOnInit(): void {
    this._cartService.getCart().subscribe(res => {
      this.cart = res
    })
    this.UserData = this._authService.authUser
    
  }
  signOut() {
    this._authService.logout()
  }


}
