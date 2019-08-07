import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EmailVerifyComponent} from "./component/email-verify/email-verify.component";
import {IdentificationComponent} from "./component/identification/identification.component";
import {InfoComponent} from "./component/info/info.component";
import {DashboardComponent} from "./component/dashboard/dashboard.component";
import {MobileSignupComponent} from "./component/mobile-signup/mobile-signup.component";


const routes: Routes = [
  { path: '', redirectTo: '/identification', pathMatch: 'full' },
  { path: 'identification', component: IdentificationComponent },
  { path: 'signup/email-verify', component: EmailVerifyComponent },
  { path: 'signup/info', component: InfoComponent },
  { path: 'signup/by-mobile', component: MobileSignupComponent },
  { path: 'dashboard', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
