import { provideRouter } from '@angular/router';
import {
  ApplicationConfig,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';

import { provideMarkdown } from 'ngx-markdown';
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
    provideMarkdown(),
  ],
};
