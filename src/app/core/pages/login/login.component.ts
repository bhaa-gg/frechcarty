import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorFormMessageComponent } from "../../../shared/components/ui/error-form-message/error-form-message.component";
import { CommonModule, JsonPipe } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { delay, Subscription, timer } from 'rxjs';
import { PasswordInputComponent } from "../../../shared/components/ui/password-input/password-input.component";
import { ForgetPassModalComponent } from "../../components/forget-pass-modal/forget-pass-modal.component";

@Component({
  selector: 'Eco-login',
  imports: [ReactiveFormsModule, ErrorFormMessageComponent, CommonModule, PasswordInputComponent, RouterLink, ForgetPassModalComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnDestroy, OnInit {
  subscriber !: Subscription

  loginLoading: boolean = false;
  showPassword: boolean = false;
  responseErrorMessage: string = '';
  _authService = inject(AuthService)
  _router = inject(Router)
  private readonly _formBuilder = inject(FormBuilder)
  loginForm!: FormGroup
  readonly loginFormValidation = {
    email: [Validators.required, Validators.email],
    password: [
      Validators.required,
      Validators.minLength(9), // minimum length based on your regex
      Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{9,}$/)
    ],
  }


  constructor() { }


  ngOnInit(): void {
    this.InitForm()
  }
  private InitForm() {
    this.loginForm = this._formBuilder.group({
      email: ['', this.loginFormValidation.email],
      password: ['', this.loginFormValidation.password],
    },
    )

  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched()
      return
    }
    this.loginLoading = true
    this.responseErrorMessage = ''
    if (this.subscriber) this.subscriber.unsubscribe() // unsubscribe previous subscriber to don't make multiple request
    this.subscriber = this._authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        console.log({ res });
        this.loginLoading = false
        this.responseErrorMessage = ''
        localStorage.setItem('token', res.token)
        localStorage.setItem('user', JSON.stringify(res.user))

        // this._router.navigate(['/home'])
        this._authService.saveUser("", res.token)
        timer(2000).subscribe(() => {
          this._router.navigate(['/home'])
        })

      },
      error: (err) => {
        console.log(err);
        this.loginLoading = false
        this.responseErrorMessage = err.error.message
      },
      complete: () => {
        this.loginLoading = false
      }
    })
  }



  get email(): AbstractControl | null {
    return this.loginForm.get("email")
  }

  get password(): AbstractControl | null {
    return this.loginForm.get("password")
  }



  ngOnDestroy(): void {
    if (this.subscriber) this.subscriber.unsubscribe()
  }





}
