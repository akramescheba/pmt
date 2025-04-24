import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { importProvidersFrom } from '@angular/core';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),

    importProvidersFrom(RouterModule),
    importProvidersFrom(BrowserAnimationsModule),
    importProvidersFrom(ToastrModule.forRoot()),
  ],
};
