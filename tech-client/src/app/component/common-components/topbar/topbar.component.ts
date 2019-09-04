import { Component, OnInit } from '@angular/core';
import {LoginRequestAction, LogoutRequestAction} from "../../../store/actions/authentication.action";
import {select, Store} from "@ngrx/store";
import {AppState} from "../../../store/states/app.state";
import {selectMeDto} from "../../../store/selectors/me.selectors";

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  showInventers= false;
  me$ = this._store.pipe(select(selectMeDto))

  constructor(private _store: Store<AppState>) { }

  ngOnInit() {
  }

  onExitClick() {
    this._store.dispatch(new LogoutRequestAction());
  }
}
