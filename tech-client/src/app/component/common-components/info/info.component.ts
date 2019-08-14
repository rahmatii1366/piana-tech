import { Component, OnInit } from '@angular/core';
import {select, Store} from "@ngrx/store";
import {selectMeDto} from "../../../store/selectors/me.selectors";
import {AppState} from "../../../store/states/app.state";

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  me$ = this._store.pipe(select(selectMeDto))

  constructor(private _store: Store<AppState>) {}

  ngOnInit() {
  }

}
