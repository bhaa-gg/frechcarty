import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../interfaces/auth-user';
import { AsyncPipe } from '@angular/common';
import { CheckHideAuthDirective } from '../../../shared/directives/check-hide-auth.directive';

@Component({
  selector: 'Eco-nav-bar',
  imports: [RouterLink, RouterLinkActive, SidebarComponent, AsyncPipe ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit {
  UserData!: any
  private readonly _authService = inject(AuthService)
  private readonly _router = inject(Router);
  ngOnInit(): void {
    this.UserData = this._authService.authUser
  }
  signOut() {
    this._authService.logout()
  }


}
