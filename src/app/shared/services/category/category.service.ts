import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { API_BASE_URL } from '../../../token/api-token';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categories$!: Observable<any>;

  private readonly _http = inject(HttpClient);
  private readonly _baseUrl = inject(API_BASE_URL);

  constructor() { }

  getCategories(): Observable<any> {
    if (!this.categories$) {
      this.categories$ = this._http.get(`${this._baseUrl}/categories`).pipe(
        shareReplay(1)
      );
    }
    return this.categories$
  }


}
