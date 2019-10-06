import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminGroupRoutingModule } from './admin-group-routing.module';
import { GroupDashboardComponent } from './group-dashboard/group-dashboard.component';
import {CommonComponentModule} from "../../../common-components/common-component.module";
import {AdminViewComponent} from "./admin-view/admin-view.component";
import {AdminEditComponent} from "./admin-edit/admin-edit.component";
import {AdminGroupComponent} from "./admin-group.component";
import {AppModule} from "../../../../app.module";
import {LeafletModule} from "@asymmetrik/ngx-leaflet";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InviteComponent} from "./invite/invite.component";


@NgModule({
  declarations: [
    GroupDashboardComponent,
    AdminGroupComponent,
    AdminViewComponent,
    AdminEditComponent,
    InviteComponent,
  ],
  imports: [
    CommonModule,
    AdminGroupRoutingModule,
    CommonComponentModule,
    LeafletModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AdminGroupModule { }
