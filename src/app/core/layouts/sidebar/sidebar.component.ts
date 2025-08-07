import { Component, inject, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../interfaces/auth-user';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'Eco-sidebar',
  imports: [RouterLink, RouterLinkActive ,AsyncPipe],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {



  @Input({required: true}) UserData: User | any

  isSidebarOpen: boolean = false
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen
  }
}
