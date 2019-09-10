import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthenticationComponent} from "./component/auth-components/authentication/authentication.component";
import {InfoComponent} from "./component/common-components/info/info.component";
import {VerifyTokenComponent} from "./component/auth-components/verify-token/verify-token.component";
import {AuthenticationGuard} from "./guard/authentication/authentication-guard.service";
import {InviteComponent} from "./component/group-components/invite/invite.component";
import {InviterComponent} from "./component/common-components/inviter/inviter.component";
import {DashboardRoutingModule} from "./component/dashboard/dashboard-routing.module";


const routes: Routes = [
  { path: '', redirectTo: 'authentication', pathMatch: 'full' },
  // { path: 'sample', component: SampleComponent },
  { path: 'dashboard', loadChildren: () => import('./component/dashboard/dashboard.module').then(m => m.DashboardModule ) },
  { path: 'authentication', component: AuthenticationComponent, canActivate: [AuthenticationGuard] },
  { path: 'authentication/verify-token', component: VerifyTokenComponent },
  { path: 'signup/info', component: InfoComponent },
  { path: 'group/invite', component: InviteComponent },
  { path: 'user/invite', component: InviterComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {useHash: true}),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
