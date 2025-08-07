import { isPlatformBrowser } from "@angular/common";
import { HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject, PLATFORM_ID } from "@angular/core";
import { tap } from "rxjs";

export const authInterceptor = (req: HttpRequest<any>, next: HttpHandlerFn) => {
    const _PLATFORM_ID = inject(PLATFORM_ID)
    let myReq = req
    if (isPlatformBrowser(_PLATFORM_ID)) {
        const token: string = localStorage.getItem('token') + ""
        myReq = req.clone({ headers: req.headers.append("token", token) })
    }
    return next(myReq).pipe(
        tap(res => console.log({ resInter: res }))
    )
}