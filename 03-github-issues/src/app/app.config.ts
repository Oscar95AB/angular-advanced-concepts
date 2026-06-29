import { provideTanStackQuery, QueryClient } from '@tanstack/angular-query-experimental';
import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { withDevtools } from '@tanstack/angular-query-experimental/devtools'

import { routes } from './app.routes';
import { provideMarkdown } from 'ngx-markdown';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideZonelessChangeDetection(),
    provideTanStackQuery(new QueryClient(), withDevtools()),
    provideMarkdown()    ]

};
