import { Component, inject, OnInit, HostListener, ElementRef, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'Eco-user-drop-down',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './user-drop-down.component.html',
  styleUrl: './user-drop-down.component.css'
})
export class UserDropDownComponent implements OnInit, AfterViewInit {

  private readonly _authService = inject(AuthService)
  UserData: any = null;
  DropDownShow: boolean = false
  UserMail!: string
  constructor(private eRef: ElementRef) { }

  ngOnInit(): void {
    // this.UserMail = JSON.parse(localStorage.getItem('user')!).email || ''
    this._authService.authUser.subscribe({
      next: (res) => {
        this.UserData = res
      }
    });

  }
  ngAfterViewInit(): void {
    this._authService.authUser.subscribe({
      next: (res) => {
        this.UserData = res
      }
    });
  }


  @HostListener("document:click", ["$event"])
  toggleDropDown(e: Event) {
    console.log({ user: this.UserData });

    if (this.DropDownShow && !this.eRef.nativeElement.contains(e.target)) {
      this.DropDownShow = false;
    }
  }
  signOut() {
    this.UserData = null
    this._authService.logout()
  }




}
