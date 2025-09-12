import { HttpClient } from '@angular/common/http';
import { afterNextRender, inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { RegisterUser_Body, LoginUser_Body, AuthUser, User } from '../../interfaces/auth-user';
import { BehaviorSubject, Observable } from 'rxjs';
import { API_BASE_URL } from '../../../token/api-token';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {




  authUser: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  private readonly _http = inject(HttpClient);
  private readonly _baseUrl = inject(API_BASE_URL);
  private readonly _router = inject(Router);

  constructor() {
    // afterNextRender : run after server side render and run in browser only
    afterNextRender(() => this.saveUser());
  }

  register(userInfo: RegisterUser_Body): Observable<any> {
    return this._http.post(`${this._baseUrl}/auth/signup`, userInfo)
  }
  login(userInfo: LoginUser_Body): Observable<any> {
    return this._http.post(`${this._baseUrl}/auth/signin`, userInfo)
  }
  forgotPasswords(userInfo: { email: string }): Observable<any> {
    return this._http.post(`${this._baseUrl}/auth/forgotPasswords`, userInfo)
  }
  verifyResetCode(resetCode: { resetCode: string }): Observable<any> {
    return this._http.post(`${this._baseUrl}/auth/verifyResetCode`, resetCode)
  }


  resetPassword(resetCode: { email: string, newPassword: string }): Observable<any> {
    return this._http.put(`${this._baseUrl}/auth/resetPassword`, resetCode)
  }
  verifyToken(): Observable<any> {
    return this._http.get(`${this._baseUrl}/auth/verifyToken`)
  }
  updateMe(me: { email: string, name: string, phone: string }): Observable<any> {
    return this._http.put(`${this._baseUrl}/users/updateMe/`, { me })
  }

  saveUser(email?: string, Token?: string) {
    const token = Token || localStorage.getItem('token')
    const user: User = jwtDecode(token!)
    if (token && user) {
      if (email) this.authUser.next({ ...user, email })
      else this.authUser.next({ ...user })
    }
    // this.verifyToken().subscribe({
    //   next: (res) => {

    //   }
    // })
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token') && !!localStorage.getItem('user')
  }


  logout() {
    this.authUser.next(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    this._router.navigate(['/auth/login'])
  }


  // get isUserExist(): boolean {
  //   const user = this.authUser.value;
  //   console.log({ user });

  //   return !!(user.token && user.user);
  // }


  // get getToken(): string {
  //   return this.authUser.value.token;
  // }

  // get getAuthUser(): AuthUser {
  //   return this.authUser.value;
  // }
  // get getUser(): User {
  //   return this.authUser.value.user;
  // }


  // get authUser$(): Observable<AuthUser> {
  //   return this.authUser.asObservable();
  // }

}
