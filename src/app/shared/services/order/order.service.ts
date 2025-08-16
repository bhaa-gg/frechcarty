import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../../token/api-token';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private readonly _http = inject(HttpClient);
  private readonly _baseUrl = inject(API_BASE_URL);

  constructor() { }



  CheckoutSession(cartId: string): Observable<any> {
    return this._http.post(`${this._baseUrl}/orders/checkout-session/${cartId}?url=http://localhost:4200/orders`, {})
  }


}
