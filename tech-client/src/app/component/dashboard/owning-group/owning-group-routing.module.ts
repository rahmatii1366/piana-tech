import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CreateGroupComponent} from "./create-group/create-group.component";
import {AdminGroupComponent} from "./admin-group/admin-group.component";
import {NeedAuthenticationGuard} from "../../../guard/need-authentication/need-authentication-guard.service";
import {OwningGroupComponent} from "./owning-group.component";
import {GroupListComponent} from "./group-list/group-list.component";


const routes: Routes = [
  { path: '', component: OwningGroupComponent, canActivate: [NeedAuthenticationGuard], children: [
    { path: '', pathMatch: 'full', redirectTo: 'group-list' },
    { path: 'group-list', component: GroupListComponent },
    { path: 'create', component: CreateGroupComponent },
    { path: 'admin/:groupName', loadChildren: () => import('./admin-group/admin-group.module').then(m => m.AdminGroupModule) },
  ]},
  // { path: '', redirectTo: 'create' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OwningGroupRoutingModule { }
