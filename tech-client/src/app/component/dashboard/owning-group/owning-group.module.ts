import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {OwningGroupRoutingModule} from './owning-group-routing.module';
import {CreateGroupComponent} from "./create-group/create-group.component";
import {AdminGroupComponent} from "./admin-group/admin-group.component";
import {AdminViewComponent} from "./admin-view/admin-view.component";
import {AdminEditComponent} from "./admin-edit/admin-edit.component";
import {OwningGroupComponent} from "./owning-group.component";
import {CommonComponentModule} from "../../common-components/common-component.module";
import {LeafletModule} from "@asymmetrik/ngx-leaflet";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    OwningGroupComponent,
    CreateGroupComponent,
    AdminGroupComponent,
    AdminViewComponent,
    AdminEditComponent,
  ],
  imports: [
    CommonModule,
    CommonComponentModule,
    OwningGroupRoutingModule,
    LeafletModule.forRoot(),
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class OwningGroupModule { }
