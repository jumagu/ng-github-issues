import { provideRouter } from '@angular/router';
import {
  ApplicationConfig,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';

import {
  provideAngularQuery,
  QueryClient,
} from '@tanstack/angular-query-experimental';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes),
    provideAngularQuery(new QueryClient()),
  ],
};
