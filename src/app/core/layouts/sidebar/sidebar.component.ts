import { Component, ElementRef, HostListener, inject, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../interfaces/auth-user';
import { AsyncPipe } from '@angular/common';
import { CartResponse } from '../../../shared/interfaces/cart';
import { CartService } from '../../../shared/services/cart/cart.service';

@Component({
  selector: 'Eco-sidebar',
  imports: [RouterLink, RouterLinkActive, AsyncPipe],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  private readonly _cartService = inject(CartService)
  cart!: CartResponse

  @Input({ required: true }) UserData: User | any

  constructor(private eRef: ElementRef) { }
  ngOnInit(): void {
    this.initCartAndWishlist()
  }

  isSidebarOpen: boolean = false
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen
  }


  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (this.isSidebarOpen && !this.eRef.nativeElement.contains(event.target)) {
      this.isSidebarOpen = false;
    }
  }

  initCartAndWishlist() {
    this._cartService.getCart().subscribe(res => {
      this.cart = res
    })

  }


}
