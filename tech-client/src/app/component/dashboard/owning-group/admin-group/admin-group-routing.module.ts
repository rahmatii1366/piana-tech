import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NeedAuthenticationGuard} from "../../../../guard/need-authentication/need-authentication-guard.service";
import {AdminGroupComponent} from "./admin-group.component";
import {GroupDashboardComponent} from "./group-dashboard/group-dashboard.component";
import {InviteComponent} from "./invite/invite.component";


const routes: Routes = [
  { path: '', component: AdminGroupComponent, canActivate: [NeedAuthenticationGuard], children: [
      { path: '', pathMatch: 'full', redirectTo: 'group-dashboard' },
      { path: 'group-dashboard', component: GroupDashboardComponent },
      { path: 'invite', component: InviteComponent },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminGroupRoutingModule { }
