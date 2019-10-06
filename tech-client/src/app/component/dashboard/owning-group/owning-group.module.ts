import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {OwningGroupRoutingModule} from './owning-group-routing.module';
import {CreateGroupComponent} from "./create-group/create-group.component";
import {AdminGroupComponent} from "./admin-group/admin-group.component";
import {AdminViewComponent} from "./admin-group/admin-view/admin-view.component";
import {AdminEditComponent} from "./admin-group/admin-edit/admin-edit.component";
import {OwningGroupComponent} from "./owning-group.component";
import {CommonComponentModule} from "../../common-components/common-component.module";
import {LeafletModule} from "@asymmetrik/ngx-leaflet";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {BrowserModule} from "@angular/platform-browser";
import { GroupListComponent } from './group-list/group-list.component';


@NgModule({
  declarations: [
    OwningGroupComponent,
    CreateGroupComponent,
    GroupListComponent,
  ],
  imports: [
    CommonModule,
    CommonComponentModule,
    OwningGroupRoutingModule,
    NgbModule,
    LeafletModule.forRoot(),
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class OwningGroupModule { }
