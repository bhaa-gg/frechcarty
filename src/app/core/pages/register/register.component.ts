import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorFormMessageComponent } from "../../../shared/components/ui/error-form-message/error-form-message.component";
import { CommonModule, JsonPipe } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PasswordInputComponent } from "../../../shared/components/ui/password-input/password-input.component";

@Component({
  selector: 'Eco-register',
  imports: [ReactiveFormsModule, ErrorFormMessageComponent, CommonModule, PasswordInputComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnDestroy, OnInit {




  subscriber !: Subscription
  showPassword: boolean = false;
  showRePassword: boolean = false;

  registerLoading: boolean = false;
  responseErrorMessage: string = '';
  _authService = inject(AuthService)
  _router = inject(Router)
  private readonly _formBuilder = inject(FormBuilder)
  registerForm!: FormGroup
  readonly registerFormValidation = {
    name: [Validators.required, Validators.minLength(3)],
    email: [Validators.required, Validators.email],
    password: [
      Validators.required,
      Validators.minLength(9), // minimum length based on your regex
      Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{9,}$/)
    ],
    rePassword: [Validators.required,
    Validators.minLength(9), // minimum length based on your regex
    Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{9,}$/)],
  }


  constructor() { }



  ngOnInit(): void {
    this.InitForm()
  }


  private InitForm() {
    this.registerForm = this._formBuilder.group({
      name: ['', this.registerFormValidation.name],
      email: ['', this.registerFormValidation.email],
      password: ['', this.registerFormValidation.password],
      rePassword: ['', this.registerFormValidation.rePassword],
    },
      {
        validators: [this.rePasswordValidation]
      }
    )

  }


  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched()
      return
    }
    this.registerLoading = true
    this.responseErrorMessage = ''
    if (this.subscriber) this.subscriber.unsubscribe()
    this.subscriber = this._authService.register(this.registerForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.registerLoading = false
        this.responseErrorMessage = ''
        this._router.navigate(['/auth/login'])
      },
      error: (err) => {
        this.registerLoading = false
        this.responseErrorMessage = err.error.message
      },
      complete: () => {
        this.registerLoading = false
      }
    })

    // this.registerForm.reset()
  }

  get name(): AbstractControl | null {
    return this.registerForm.get("name")
  }

  get email(): AbstractControl | null {
    return this.registerForm.get("email")
  }

  get password(): AbstractControl | null {
    return this.registerForm.get("password")
  }

  get rePassword(): AbstractControl | null {
    return this.registerForm.get("rePassword")
  }

  rePasswordValidation(form: AbstractControl) {
    const password = form.get("password")?.value;
    const rePassword = form.get("rePassword")?.value;
    return password === rePassword ? null : { misMatch: true }
  }
  ngOnDestroy(): void {
    if (this.subscriber) this.subscriber.unsubscribe()
  }


}
