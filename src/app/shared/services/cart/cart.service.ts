import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_BASE_URL } from '../../../token/api-token';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly _http = inject(HttpClient)
  private readonly _baseUrl = inject(API_BASE_URL)

  constructor() { }
  getCart(): Observable<any> {
    return this._http.get(`${this._baseUrl}/cart`);
  }
  addProductToCart(id: string): Observable<any> {
    return this._http.post(`${this._baseUrl}/cart`, { productId: id });
  }
  updateCartQuantity(id: string, number: string): Observable<any> {
    return this._http.put(`${this._baseUrl}/cart/${id}`, { count: number });
  }
  deleteProductFromCart(id: string): Observable<any> {
    return this._http.delete(`${this._baseUrl}/cart/${id}`);
  }
  clearCart(): Observable<any> {
    return this._http.delete(`${this._baseUrl}/cart`);
  }

}
