import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from "./dashboard.component";
import {SearchGroupComponent} from "./search-group/search-group.component";
import {CommonComponentModule} from "../common-components/common-component.module";
import {SearchPlayerComponent} from "./search-player/search-player.component";


@NgModule({
  declarations: [
    DashboardComponent,
    SearchGroupComponent,
    SearchPlayerComponent,
  ],
  imports: [
    CommonModule,
    CommonComponentModule,
    DashboardRoutingModule,
  ]
})
export class DashboardModule { }
