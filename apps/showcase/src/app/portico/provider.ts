import { InjectionToken, Provider, Type } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PorticoProvider } from './contracts';
import { FixturePorticoAdapter } from './fixture-portico.adapter';

export const PORTICO_PROVIDER = new InjectionToken<PorticoProvider>('PORTICO_PROVIDER');

export interface PorticoRuntimeConfig {
  fixtureBaseUrl?: string;
  adapterClass?: Type<PorticoProvider>;
}

export function providePorticoRuntime(config: PorticoRuntimeConfig = {}): Provider[] {
  if (config.adapterClass) {
    return [{ provide: PORTICO_PROVIDER, useClass: config.adapterClass }];
  }

  return [
    {
      provide: PORTICO_PROVIDER,
      useFactory: (http: HttpClient) =>
        new FixturePorticoAdapter(http, config.fixtureBaseUrl ?? '/fixtures'),
      deps: [HttpClient],
    },
  ];
}
