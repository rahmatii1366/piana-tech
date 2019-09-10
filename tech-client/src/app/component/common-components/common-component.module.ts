import { NgModule } from '@angular/core';
import {TopbarComponent} from "./topbar/topbar.component";
import {FootbarComponent} from "./footbar/footbar.component";
import {InfoComponent} from "./info/info.component";
import {UserViewPannelComponent} from "./user-view-pannel/user-view-pannel.component";
import {InviterComponent} from "./inviter/inviter.component";
import {ImageUploaderComponent} from "./image-uploader/image-uploader.component";
import {SampleComponent} from "./sample/sample.component";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    TopbarComponent,
    FootbarComponent,
    InfoComponent,
    UserViewPannelComponent,
    InviterComponent,
    ImageUploaderComponent,
    SampleComponent,
  ],
  exports: [
    TopbarComponent,
    FootbarComponent,
    InfoComponent,
    UserViewPannelComponent,
    InviterComponent,
    ImageUploaderComponent,
    SampleComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class CommonComponentModule { }
