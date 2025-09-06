import { Component, ElementRef, HostListener, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { WishlistService } from '../../../shared/services/Wishlist/wishlist.service';
import { CommonModule } from '@angular/common';
import { WishList } from '../../../shared/interfaces/cart';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'Eco-wishlist',
  imports: [CommonModule, RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnChanges {
  private readonly _wishlistService = inject(WishlistService)
  @Input() wishlistId!: string[];
  IsHide: boolean = false
  loading!: string
  WishListData !: WishList[]
  private readonly _toaster = inject(ToastrService)

  constructor(private eRef: ElementRef) { }
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
  handleShow() {

    if (!this.WishListData.length) {
      this._toaster.error('Wishlist is empty', 'Error', { timeOut: 3000 })
      return
    }
    this.IsHide = !this.IsHide
  }
}
