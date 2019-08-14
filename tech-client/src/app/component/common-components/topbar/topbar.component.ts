import { Component, OnInit } from '@angular/core';
import {LoginRequestAction, LogoutRequestAction} from "../../../store/actions/authentication.action";
import {Store} from "@ngrx/store";
import {AppState} from "../../../store/states/app.state";

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  constructor(private _store: Store<AppState>) { }

  ngOnInit() {
  }

  onExitClick() {
    this._store.dispatch(new LogoutRequestAction());
  }
}
