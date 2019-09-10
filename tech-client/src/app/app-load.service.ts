import {Injectable} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "./store/states/app.state";
import {HowMeRequestAction} from "./store/actions/authentication.action";

@Injectable({
  providedIn: 'root'
})
export class AppLoadService {

  constructor(private _store: Store<AppState>) { }

  initializeApp(): Promise<any> {
    return new Promise((resolve, reject) => {
      console.log(`initializeApp:: inside promise`);

      this._store.dispatch(new HowMeRequestAction());

      setTimeout(() => {
        console.log(`initializeApp:: inside setTimeout`);
        // doing something

        resolve();
      }, 3000);
    });
  }
}
