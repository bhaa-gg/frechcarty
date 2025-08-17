import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../../token/api-token';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private Brands$!: Observable<any>;
  private readonly _http = inject(HttpClient);
  private readonly _baseUrl = inject(API_BASE_URL);

  constructor() { }




  getBrands(): Observable<any> {
    if (!this.Brands$) {
      this.Brands$ = this._http.get(`${this._baseUrl}/brands`);
    }
    return this.Brands$;
  }



}
