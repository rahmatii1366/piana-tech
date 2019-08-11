import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './component/app/app.component';
import {TopbarComponent} from './component/topbar/topbar.component';
import {FootbarComponent} from './component/footbar/footbar.component';
import {SignupComponent} from './component/signup/signup.component';
import {VerifyTokenComponent} from './component/verify-token/verify-token.component';
import {HttpClientModule} from "@angular/common/http";
import {StoreModule} from "@ngrx/store";
import {appReducers} from "./store/reducers/app.reducer";
import {StoreRouterConnectingModule} from "@ngrx/router-store";
import {environment} from "../environments/environment.prod";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {EffectsModule} from "@ngrx/effects";
import {AuthenticationEffects} from "./store/effects/authentication-effects.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LoginComponent} from './component/login/login.component';
import {InfoComponent} from './component/info/info.component';
import {ApiModule} from "./api/api.module";
import {DashboardComponent} from './component/dashboard/dashboard.component';
import {AuthenticationComponent} from "./component/authentication/authentication.component";
import {AuthenticationGuard} from "./guard/authentication/authentication-guard.service";

@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    FootbarComponent,
    SignupComponent,
    VerifyTokenComponent,
    LoginComponent,
    AuthenticationComponent,
    InfoComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    ApiModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([AuthenticationEffects]),
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
