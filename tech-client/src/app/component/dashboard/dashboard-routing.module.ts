import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "./dashboard.component";
import {NeedAuthenticationGuard} from "../../guard/need-authentication/need-authentication-guard.service";
import {SearchGroupComponent} from "./search-group/search-group.component";
import {SearchPlayerComponent} from "./search-player/search-player.component";


const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [NeedAuthenticationGuard], children: [
      { path: '', pathMatch: 'full', redirectTo: 'owned' },
      { path: 'owned', loadChildren: () => import('./owning-group/owning-group.module').then(m => m.OwningGroupModule) },
      { path: 'search', component: SearchGroupComponent },
      { path: 'search-players', component: SearchPlayerComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
