import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from "./dashboard.component";
import {NeedAuthenticationGuard} from "../../guard/need-authentication/need-authentication-guard.service";
import {SearchGroupComponent} from "./search-group/search-group.component";


const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [NeedAuthenticationGuard], children: [
      { path: 'owned', loadChildren: () => import('./owning-group/owning-group.module').then(m => m.OwningGroupModule) },
      { path: 'search', component: SearchGroupComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
