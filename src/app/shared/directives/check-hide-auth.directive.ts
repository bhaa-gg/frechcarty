import { Directive, ElementRef, inject, Input, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';

@Directive({
  selector: '[ecoCheckHideAuth]'
})
export class CheckHideAuthDirective implements OnInit {
  private readonly _authService = inject(AuthService)
  constructor(private _ele: ElementRef) { }
  @Input() ecoCheckHideAuth: boolean = true
  ngOnInit(): void {
    this._authService.authUser.subscribe({
      next: (res) => {
        if (res?.id && this.ecoCheckHideAuth) {
          this._ele.nativeElement.classList.remove('hidden')
        } else {
          this._ele.nativeElement.classList.add('hidden')
        }
      }
    })
  }
}
