import { Component, inject, OnInit } from '@angular/core';
import { ErrorFormMessageComponent } from "../../../shared/components/ui/error-form-message/error-form-message.component";
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { PasswordInputComponent } from "../../../shared/components/ui/password-input/password-input.component";
import { Router } from '@angular/router';



enum Props {
  email = "email",
  otp = "otp",
  reset = "reset"
}

@Component({
  selector: 'Eco-forget-pass-modal',
  imports: [CommonModule, ErrorFormMessageComponent, ReactiveFormsModule, FormsModule, PasswordInputComponent],
  templateUrl: './forget-pass-modal.component.html',
  styleUrl: './forget-pass-modal.component.css'
})
export class ForgetPassModalComponent implements OnInit {
  private readonly _toaster = inject(ToastrService)
  isOpenModal: boolean = false

  showPassword: boolean = false;
  otp: string[] = ["", "", "", "", "", ""];
  loginForm!: FormGroup
  readonly loginFormValidation = {
    email: [Validators.required, Validators.email],
    password: [
      Validators.required,
      Validators.minLength(9), // minimum length based on your regex
      Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{9,}$/)
    ],
  }

  loading: boolean = false
  isOtp: Props = Props.email
  private readonly _authService = inject(AuthService)
  private readonly _formBuilder = inject(FormBuilder)
  forget!: FormGroup
  readonly forgetValidation = {
    emails: [Validators.required, Validators.email],
  }



  private InitForm2() {
    this.loginForm = this._formBuilder.group({
      email: ['', this.loginFormValidation.email],
      password: ['', this.loginFormValidation.password],
    },
    )

  }


  get email(): AbstractControl | null {
    return this.loginForm.get("email")
  }

  get password(): AbstractControl | null {
    return this.loginForm.get("password")
  }

  onSubmits() {
    this.loading = true
    this._authService.forgotPasswords({ email: this.forget.value.emails }).subscribe({
      next: (res) => {
        this.loading = false
        if (res.statusMsg.toLowerCase() == 'success') {
          this.isOtp = Props.otp
        }
      },
      error: (err) => {
        this.loading = false
      }
    })
  }
  ngOnInit(): void {
    this.InitForm2()
    this.InitForm()
  }
  private InitForm() {
    this.forget = this._formBuilder.group({
      emails: ['', this.forgetValidation.emails],
    },
    )
  }

  get emails() {
    return this.forget.get('emails')
  }





  submitForm() {
    if (this.otp.join("").length < 5) {
      this._toaster.error("Please enter the otp", "Error", {})
      return
    }
    this.loading = true
    this._authService.verifyResetCode({ resetCode: this.otp.join('') }).subscribe({
      next: (res) => {
        this.loading = false
        this.isOtp = Props.reset
      },
      error: (err) => {
        this._toaster.error(err.error.message)
        this.loading = false
      }
    })
  }


  onSubmitLogin() {
    this.loading = true
    this._authService.resetPassword({ email: this.loginForm.value.email, newPassword: this.loginForm.value.password }).subscribe({
      next: (res) => {
        if (!res.token) return
        this.isOtp = Props.email
        this.loading = false
        this.isOpenModal = false
        this._toaster.success('Password reset successfully Login again', 'Success', {})
      },
      error: (err) => {
        this._toaster.error(err.error.message)
        this.loading = false
      }
    })
  }
}


