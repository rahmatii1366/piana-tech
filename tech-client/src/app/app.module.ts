import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './component/app/app.component';
import {SignupComponent} from './component/auth-components/signup/signup.component';
import {VerifyTokenComponent} from './component/auth-components/verify-token/verify-token.component';
import {HttpClientModule} from "@angular/common/http";
import {StoreModule} from "@ngrx/store";
import {appReducers} from "./store/reducers/app.reducer";
import {StoreRouterConnectingModule} from "@ngrx/router-store";
import {environment} from "../environments/environment.prod";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {EffectsModule} from "@ngrx/effects";
import {AuthenticationEffects} from "./store/effects/authentication-effects.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LoginComponent} from './component/auth-components/login/login.component';
import {ApiModule} from "./api/api.module";
import {AuthenticationComponent} from "./component/auth-components/authentication/authentication.component";
import {Ng2LoadingSpinnerModule} from "ng2-loading-spinner";
import {LeafletModule} from "@asymmetrik/ngx-leaflet";
import {AgeLevelEffects} from "./store/effects/age-level-effects.service";
import {GroupEffects} from "./store/effects/group-effects.service";
import {InviteEffects} from "./store/effects/invite-effects.service";
import {NgbActiveModal, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {PianaWindowRefService} from "./services/window-ref/window-ref.service";
import {RootContainerService} from "./services/root-container/root-container.service";
import {ImageUploadModule} from "angular2-image-upload";
import {AppLoadService} from "./app-load.service";
import {CommonComponentModule} from "./component/common-components/common-component.module";
import {RouterModule} from "@angular/router";
import {SettingComponent} from "./component/auth-components/setting/setting.component";
import {PositionEffects} from "./store/effects/position-effects.service";
import {PlayerEffects} from "./store/effects/player-effects.service";

export function init_app(appLoadService: AppLoadService) {
  return () => appLoadService.initializeApp();
}

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    VerifyTokenComponent,
    LoginComponent,
    AuthenticationComponent,
    SettingComponent,
  ],
  imports: [
    RouterModule,
    BrowserModule,
    CommonComponentModule,
    NgbModule,
    LeafletModule.forRoot(),
    Ng2LoadingSpinnerModule.forRoot({
      spinnerColor: 'blue'
    }),
    ImageUploadModule.forRoot(),
    ApiModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([
      AuthenticationEffects,
      AgeLevelEffects,
      PositionEffects,
      GroupEffects,
      InviteEffects,
      PlayerEffects,
    ]),
    StoreRouterConnectingModule.forRoot({stateKey: 'router'}),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    HttpClientModule,
    AppRoutingModule
  ],
  exports:[
    // LeafletModule
  ],
  providers: [
    AppLoadService,
    { provide: APP_INITIALIZER, useFactory: init_app, deps: [AppLoadService], multi: true },
    NgbActiveModal,
    PianaWindowRefService,
    RootContainerService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
