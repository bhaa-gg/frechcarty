import { isPlatformBrowser } from "@angular/common";
import { HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject, PLATFORM_ID } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { catchError, tap, throwError } from "rxjs";

export const authInterceptor = (req: HttpRequest<any>, next: HttpHandlerFn) => {
    const _toaster = inject(ToastrService)

    const _PLATFORM_ID = inject(PLATFORM_ID)
    let myReq = req
    if (isPlatformBrowser(_PLATFORM_ID)) {
        const token: string = localStorage.getItem('token') + ""
        myReq = req.clone({ headers: req.headers.append("token", token) })
    }
    return next(myReq).pipe(
        catchError(err => {
            // _toaster.error(err.error.message, "Error")
            return throwError(() => err);
        })
    )
}