import { Component } from '@angular/core';
import {select, Store} from "@ngrx/store";
import {AppState} from "../../store/states/app.state";
import {selectShowSpinner} from "../../store/selectors/wait.selectors";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showSpinner$ = this._store.pipe(select(selectShowSpinner))

  title = 'tech-client';
  // config$ = this._store.pipe(select())

  constructor(private _store: Store<AppState>) {}
}
