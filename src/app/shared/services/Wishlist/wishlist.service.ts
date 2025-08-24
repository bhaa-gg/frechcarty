import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { API_BASE_URL } from '../../../token/api-token';


@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private readonly _http = inject(HttpClient)
  private readonly _baseUrl = inject(API_BASE_URL)
  WhishListData: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([])

  constructor() { }

  getWishlist(): Observable<any> {
    return this._http.get(`${this._baseUrl}/wishlist`).pipe(
      tap((res: any) => this.WhishListData.next(res.data.map((item: any) => item._id)))
    );
  }
  addToWishlist(productId: string): Observable<any> {
    return this._http.post(`${this._baseUrl}/wishlist`, { productId }).pipe(
      tap((res: any) => this.WhishListData.next(res.data)))
  }

  removeFromWishlist(productId: string): Observable<any> {
    return this._http.delete(`${this._baseUrl}/wishlist/${productId}`).pipe(
      tap((res: any) => this.WhishListData.next(res.data)));
  }

}
