import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CreateGroupComponent} from "./create-group/create-group.component";
import {AdminGroupComponent} from "./admin-group/admin-group.component";
import {NeedAuthenticationGuard} from "../../../guard/need-authentication/need-authentication-guard.service";
import {OwningGroupComponent} from "./owning-group.component";


const routes: Routes = [
  { path: '', component: OwningGroupComponent, canActivate: [NeedAuthenticationGuard], children: [
    { path: 'create', component: CreateGroupComponent },
    { path: 'admin', component: AdminGroupComponent },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OwningGroupRoutingModule { }
