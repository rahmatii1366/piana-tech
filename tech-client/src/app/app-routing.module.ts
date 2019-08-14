import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthenticationComponent} from "./component/auth-components/authentication/authentication.component";
import {InfoComponent} from "./component/common-components/info/info.component";
import {DashboardComponent} from "./component/common-components/dashboard/dashboard.component";
import {VerifyTokenComponent} from "./component/auth-components/verify-token/verify-token.component";
import {AuthenticationGuard} from "./guard/authentication/authentication-guard.service";
import {CreateGroupComponent} from "./component/group-components/create-group/create-group.component";
import {AdminGroupComponent} from "./component/group-components/admin-group/admin-group.component";


const routes: Routes = [
  { path: '', redirectTo: 'authentication', pathMatch: 'full' },
  { path: 'authentication', component: AuthenticationComponent, canActivate: [AuthenticationGuard] },
  { path: 'authentication/verify-token', component: VerifyTokenComponent },
  { path: 'signup/info', component: InfoComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'group/create', component: CreateGroupComponent},
  { path: 'group/admin-view', component: AdminGroupComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
