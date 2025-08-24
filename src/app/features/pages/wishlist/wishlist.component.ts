import { Component, ElementRef, HostListener, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { WishlistService } from '../../../shared/services/Wishlist/wishlist.service';
import { CommonModule } from '@angular/common';
import { WishList } from '../../../shared/interfaces/cart';

@Component({
  selector: 'Eco-wishlist',
  imports: [CommonModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnChanges {
  private readonly _wishlistService = inject(WishlistService)
  @Input() wishlistId!: string[];
  IsHide: boolean = false
  loading!: string
  WishListData !: WishList[]
  
  constructor(private eRef: ElementRef) {}
  getWishlist() {
    this._wishlistService.getWishlist().subscribe(res => {
      this.WishListData = res.data
      console.log(res.data);
    })
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (this.IsHide && !this.eRef.nativeElement.contains(event.target)) {
      this.IsHide = false;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['wishlistId'] && this.WishListData?.length != this.wishlistId?.length) {
      this.getWishlist()
    }
  }

  removeItem(id: string) {
    this.loading = id
    this._wishlistService.removeFromWishlist(id).subscribe({
      next: (value) => {
        this.loading = ''
      }, error: (err) => {
        this.loading = ''
      },
      complete: () => {
        this.loading = ''
      },
    })
  }
}
