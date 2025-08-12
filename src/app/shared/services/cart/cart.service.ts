import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_BASE_URL } from '../../../token/api-token';
import { BehaviorSubject, Observable, shareReplay, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly _http = inject(HttpClient)
  private readonly _baseUrl = inject(API_BASE_URL)
  cart$: BehaviorSubject<any> = new BehaviorSubject<any>(null)


  fromCahced: boolean = false

  constructor() { }
  getCart(): Observable<any> {
    if (!this.cart$.value || !this.fromCahced) {
      console.log("from get Cart");

      this._http.get(`${this._baseUrl}/cart`).pipe(
        shareReplay(1)
      ).subscribe((cart) => {
        this.fromCahced = true
        this.cart$.next(cart);
      });
    }
    return this.cart$;
  }

  updateCartQuantity2(id: string, number: string): Observable<any> {
    return this._http.put(`${this._baseUrl}/cart/${id}`, { count: number }).pipe(
      tap((updatedCart) => {
        this.cart$.next(updatedCart);
      })
    );
  }
  deleteProductFromCart2(id: string): Observable<any> {
    return this._http.delete(`${this._baseUrl}/cart/${id}`).pipe(
      tap((updatedCart) => {
        this.cart$.next(updatedCart);
      })
    );;
  }
  clearCart2(): Observable<any> {
    return this._http.delete(`${this._baseUrl}/cart`).pipe(
      tap((updatedCart) => {
        this.cart$.next(updatedCart);
      })
    );;
  }
  addProductToCart2(id: string): Observable<any> {
    return this._http.post(`${this._baseUrl}/cart`, { productId: id }).pipe(
      tap((updatedCart: any) => {
        this.fromCahced = false
        this.cart$.next({ cartId: updatedCart.cartId, data: updatedCart.data, numOfCartItems: updatedCart.numOfCartItems, status: updatedCart.status });
      })
    );
  }
}
