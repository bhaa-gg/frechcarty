import {
  ApplicationConfig
  , importProvidersFrom, provideZoneChangeDetection
} from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import {
  BrowserModule,
  provideClientHydration
  , withEventReplay
} from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { API_BASE_URL } from './token/api-token';
import { authInterceptor } from './shared/interceptors/auth-interceptor.service';
import { ToastrModule } from 'ngx-toastr';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true })
    , provideRouter(routes
      , withViewTransitions(),
    )
    , importProvidersFrom([BrowserAnimationsModule, BrowserModule])
    ,
  provideHttpClient(withFetch(), withInterceptors([authInterceptor]))
    , provideClientHydration(withEventReplay()),
  provideNoopAnimations(), importProvidersFrom(
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      // preventDuplicates: true,
    })
  ),
  {
    provide: API_BASE_URL,
    useValue: "https://ecommerce.routemisr.com/api/v1"
  }

  ]
};
