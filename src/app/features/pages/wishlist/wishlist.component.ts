import { Component, inject, OnInit } from '@angular/core';
import { WishlistService } from '../../../shared/services/Wishlist/wishlist.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'Eco-wishlist',
  imports: [],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnInit {
  private readonly _wishlistService = inject(WishlistService)



  ngOnInit(): void {
    this._wishlistService.getWishlist().subscribe(res => {
      console.log(res);
    })
  }
}
