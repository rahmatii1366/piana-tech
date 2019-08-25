import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './component/app/app.component';
import {TopbarComponent} from './component/common-components/topbar/topbar.component';
import {FootbarComponent} from './component/common-components/footbar/footbar.component';
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
import {InfoComponent} from './component/common-components/info/info.component';
import {ApiModule} from "./api/api.module";
import {DashboardComponent} from './component/common-components/dashboard/dashboard.component';
import {AuthenticationComponent} from "./component/auth-components/authentication/authentication.component";
import {Ng2LoadingSpinnerModule} from "ng2-loading-spinner";
import {CreateGroupComponent} from './component/group-components/create-group/create-group.component';
import {LeafletModule} from "@asymmetrik/ngx-leaflet";
import {AdminGroupComponent} from './component/group-components/admin-group/admin-group.component';
import {AgeLevelEffects} from "./store/effects/age-level-effects.service";
import {GroupEffects} from "./store/effects/group-effects.service";
import {AdminViewComponent} from "./component/group-components/admin-view/admin-view.component";
import {AdminEditComponent} from "./component/group-components/admin-edit/admin-edit.component";
import { InviteComponent } from './component/group-components/invite/invite.component';
import {InviteEffects} from "./store/effects/invite-effects.service";
import { InviterComponent } from './component/common-components/inviter/inviter.component';
import {NgbActiveModal, NgbModule} from "@ng-bootstrap/ng-bootstrap";

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
    CreateGroupComponent,
    AdminGroupComponent,
    AdminViewComponent,
    AdminEditComponent,
    InviteComponent,
    InviterComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    LeafletModule.forRoot(),
    Ng2LoadingSpinnerModule.forRoot({
      spinnerColor: 'blue'
    }),
    ApiModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([
      AuthenticationEffects,
      AgeLevelEffects,
      GroupEffects,
      InviteEffects
    ]),
    StoreRouterConnectingModule.forRoot({stateKey: 'router'}),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    NgbActiveModal
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
