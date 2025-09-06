import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, shareReplay, tap } from 'rxjs';
import { API_BASE_URL } from '../../../token/api-token';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly _http = inject(HttpClient);
  private readonly _baseUrl = inject(API_BASE_URL);
  CacheFlag: boolean = false
  private Orders$!: Observable<any>;

  constructor() { }

  getAllOrders(userId: string): Observable<any> {
    if (this.CacheFlag) {
      return this.Orders$
    }
    this.Orders$ = this._http.get(`${this._baseUrl}/orders/user/${userId}`).pipe(
      shareReplay(1),
      tap(() => {
        this.CacheFlag = true
      })
    );
    return this.Orders$
  }

  CheckoutSession(cartId: string, shippingAddress: {
    details: string,
    phone: string,
    city: string
  }): Observable<any> {
     const currentUrl = window.location.origin;
    return this._http.post(`${this._baseUrl}/orders/checkout-session/${cartId}?url=${currentUrl}/#`, shippingAddress).pipe(
      tap(() => {
        this.CacheFlag = false
      })
    )
  }


}
