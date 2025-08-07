import { Directive, ElementRef, inject, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';

@Directive({
  selector: '[ecoCheckHideAuth]'
})
export class CheckHideAuthDirective implements OnInit {
  private readonly _authService = inject(AuthService)
  constructor(private _ele: ElementRef) { }
  ngOnInit(): void {
    this._authService.authUser.subscribe({
      next: (res) => {
        if (res?.id) {
          this._ele.nativeElement.classList.remove('hidden')
        } else {
          this._ele.nativeElement.classList.add('hidden')
        }
      }
    })
  }
}
