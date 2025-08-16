import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { map } from 'rxjs';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'Eco-user-drop-down',
  imports: [SlicePipe],
  templateUrl: './user-drop-down.component.html',
  styleUrl: './user-drop-down.component.css'
})
export class UserDropDownComponent implements OnInit {

  private readonly _authService = inject(AuthService)
  DropDownShow: boolean = false
  UserName!: string
  ngOnInit(): void {
    this._authService.authUser.subscribe(res => {
      if (res) {
        this.UserName = res.name
      }
    })
  }


  signOut() {
    this._authService.logout()
  }
}
