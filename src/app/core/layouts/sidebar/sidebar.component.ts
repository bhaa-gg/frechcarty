import { Component, ElementRef, HostListener, inject, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../interfaces/auth-user';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'Eco-sidebar',
  imports: [RouterLink, RouterLinkActive, AsyncPipe],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {



  @Input({ required: true }) UserData: User | any

  constructor(private eRef: ElementRef) { }

  isSidebarOpen: boolean = false
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen
  }


  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (this.isSidebarOpen && !this.eRef.nativeElement.contains(event.target)) {
      this.isSidebarOpen = false;
    }
  }


}
