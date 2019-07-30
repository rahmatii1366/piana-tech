import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import {
  INIT_WEB_CONSOLE_API_CONFIGURATION
} from './init-api-configuration';
import { ApiInterceptor } from './api-interceptor.service';
import { API_INTERCEPTOR_PROVIDER } from './api-interceptor-providers';
import { WebConsoleApiModule } from './web-console/web-console-api.module';
import { environment } from 'src/environments/environment';

/**
 * Provider for all UserApi services, plus UserApiConfiguration
 */
@NgModule({
  imports: [
    HttpClientModule,
    WebConsoleApiModule
  ],
  exports: [
    HttpClientModule,
    WebConsoleApiModule
  ],
  declarations: [],
  providers: [
    INIT_WEB_CONSOLE_API_CONFIGURATION,
    ApiInterceptor,
    API_INTERCEPTOR_PROVIDER,
  ],
})
export class ApiModule {
}
