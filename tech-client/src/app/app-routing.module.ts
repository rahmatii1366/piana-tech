import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SignupComponent} from "./component/signup/signup.component";
import {EmailVerifyComponent} from "./component/email-verify/email-verify.component";


const routes: Routes = [
  { path: '', redirectTo: '/signup', pathMatch: 'full' },
  { path: 'signup', component: SignupComponent },
  { path: 'signup/email-verify', component: EmailVerifyComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
