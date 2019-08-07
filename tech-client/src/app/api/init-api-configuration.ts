import {WebConsoleApiConfiguration} from './web-console/web-console-api-configuration';
import {APP_INITIALIZER, Provider} from '@angular/core';

export function initWebConsoleApiConfiguration(config: WebConsoleApiConfiguration): Function {
  return () => {
    config.rootUrl = 'http://localhost:8080';
  };
}

export const INIT_WEB_CONSOLE_API_CONFIGURATION: Provider = {
  provide: APP_INITIALIZER,
  useFactory: initWebConsoleApiConfiguration,
  deps: [WebConsoleApiConfiguration],
  multi: true
};
