import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'Eco-profile',
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  loading!: boolean
  UserData: any
  StoredUserData: any
  private readonly _toaster = inject(ToastrService)

  private readonly _authService = inject(AuthService)
  ngOnInit(): void {
    this.StoredUserData = JSON.parse(localStorage.getItem('user') || '{}')
    this._authService.authUser.subscribe(res => {
      this.UserData = res
    })
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];


    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.StoredUserData.avatar = reader.result as string;
      };
      reader.readAsDataURL(file);
      localStorage.setItem('user', JSON.stringify(this.StoredUserData))
    }
  }

  updateProfile() {
    this.loading = true
    this._authService.updateMe({
      name: this.StoredUserData.name,
      email: this.StoredUserData.email,
      phone: this.StoredUserData.phone,
    }).subscribe({
      next: (res) => {
        this.loading = false
        console.log(res);
        this._toaster.success(res.message, '', {
          messageClass: 'text-sm font-semibold ',
        });
      }, error: (err) => {
        this.loading = false
        console.log(err);
      }
    })
  }



}
