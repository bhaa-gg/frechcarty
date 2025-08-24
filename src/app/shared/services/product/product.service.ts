import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable, shareReplay } from 'rxjs';
import { API_BASE_URL } from '../../../token/api-token';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products$!: Observable<any>;
  private readonly _http = inject(HttpClient);
  private readonly _baseUrl = inject(API_BASE_URL);


  constructor() { }
  getProducts(params?: any): Observable<any> {
    if (!this.products$) {
      this.products$ = this._http.get(`${this._baseUrl}/products`,).pipe(
        shareReplay(1)
      );
    }
    return this.products$
  }
  getProductsParams(params?: any): Observable<any> {
    let httpParams = new HttpParams();
    if (Object.keys(params).length) {
      Object.keys(params).forEach(key => {
        if (params[key] !== null && params[key] !== undefined) {
          httpParams = httpParams.set(key, params[key]);
        }
      });
    }
    return this._http.get(`${this._baseUrl}/products`, {
      params: httpParams
    }).pipe(
      shareReplay(1)
    );
  }
  getProductsById(id: string): Observable<any> {
    return this._http.get(`${this._baseUrl}/products/${id}`);
  }


  getProductsByCategoryId(id: string): Observable<any> {
    return this._http.get(`${this._baseUrl}/products`, {
      params: new HttpParams().set('category[in]', id)
    });
  }



  invalidateCache() {
    this.products$ = null!;
  }
}
