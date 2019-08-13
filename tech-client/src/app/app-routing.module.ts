import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthenticationComponent} from "./component/authentication/authentication.component";
import {InfoComponent} from "./component/info/info.component";
import {DashboardComponent} from "./component/dashboard/dashboard.component";
import {VerifyTokenComponent} from "./component/verify-token/verify-token.component";
import {AuthenticationGuard} from "./guard/authentication/authentication-guard.service";
import {CreateGroupComponent} from "./component/create-group/create-group.component";
import {AdminGroupComponent} from "./component/admin-group/admin-group.component";


const routes: Routes = [
  { path: '', redirectTo: '/group/create', pathMatch: 'full' },
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
