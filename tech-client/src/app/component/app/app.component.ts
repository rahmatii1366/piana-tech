import { Component } from '@angular/core';
import {Store} from "@ngrx/store";
import {IAppState} from "../../store/states/app.state";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tech-client';
  // config$ = this._store.pipe(select())

  constructor(private _store: Store<IAppState>) {}
}
