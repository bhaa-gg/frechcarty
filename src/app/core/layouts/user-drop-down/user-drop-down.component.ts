import { Component, inject, OnInit, HostListener, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'Eco-user-drop-down',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './user-drop-down.component.html',
  styleUrl: './user-drop-down.component.css'
})
export class UserDropDownComponent implements OnInit {

  UserData!: any
  private readonly _authService = inject(AuthService)
  DropDownShow: boolean = false
  UserMail!: string
  constructor(private eRef: ElementRef) { }

  ngOnInit(): void {
    this.UserMail = JSON.parse(localStorage.getItem('user')!).email || ''

    this._authService.authUser.subscribe(res => {
      this.UserData = res
    })
  }


  @HostListener("document:click", ["$event"])
  toggleDropDown(e: Event) {
    if (this.DropDownShow && !this.eRef.nativeElement.contains(e.target)) {
      this.DropDownShow = false;
    }
  }
  signOut() {
    this._authService.logout()
    this.UserData = null
  }




}
