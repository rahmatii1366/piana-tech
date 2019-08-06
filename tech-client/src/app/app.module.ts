import { BrowserModule } from '@angular/platform-browser';
import {forwardRef, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './component/app/app.component';
import { TopbarComponent } from './component/topbar/topbar.component';
import { FootbarComponent } from './component/footbar/footbar.component';
import { SignupComponent } from './component/signup/signup.component';
import { EmailVerifyComponent } from './component/email-verify/email-verify.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {StoreModule} from "@ngrx/store";
import {appReducers} from "./store/reducers/app.reducer";
import {StoreRouterConnectingModule} from "@ngrx/router-store";
import {environment} from "../environments/environment.prod";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {EffectsModule} from "@ngrx/effects";
import {SignupEffects} from "./store/effects/signup-effects.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { LoginComponent } from './component/login/login.component';
import { IdentificationComponent } from './component/identification/identification.component';
import { InfoComponent } from './component/info/info.component';
import {CustomBrowserXhrService} from "./services/custom-browser-xhr/custom-browser-xhr.service";
import {ApiModule} from "./api/api.module";
import {RouterModule} from "@angular/router";
import { DashboardComponent } from './component/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    FootbarComponent,
    SignupComponent,
    EmailVerifyComponent,
    LoginComponent,
    IdentificationComponent,
    InfoComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    ApiModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([SignupEffects]),
    StoreRouterConnectingModule.forRoot({stateKey: 'router'}),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
