import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {AppState} from "../states/app.state";
import {Store} from "@ngrx/store";
import {
  LoginActionEnum,
  LoginAction,
  LoginNavigateAction
} from "../actions/login.action";
import {GuestService} from "../../api/web-console/services/guest.service";
import {catchError, map, switchMap} from "rxjs/operators";
import * as loginActions from '../actions/login.action';
import {Observable, of} from "rxjs";
import {Router} from "@angular/router";

@Injectable()
export class SignupEffects {
  constructor(
    private router: Router,
    private _actions$: Actions,
    private _store: Store<AppState>,
    private guestService: GuestService
  ) {}

  @Effect()
  signup$ = this._actions$.pipe(
    ofType<LoginAction>(LoginActionEnum.LOGIN_REQUEST),
    map(action => action.payload),
    switchMap(loginDto => {
      return this.guestService.login(loginDto).pipe(
        map(success => new loginActions.LoginNavigateAction(success)),
        catchError(error => of(new loginActions.LoginErrorAction(error)))
      )
    })
  );

  @Effect()
  signupNavigate$ = this._actions$.pipe(
    ofType<LoginNavigateAction>(LoginActionEnum.LOGIN_REQUEST_NAVIGATE),
    map(action => action.payload),
    switchMap(meDto => {
      return new Observable(observer => {
        this.router.navigateByUrl("login/submitted")
        observer.next(new loginActions.LoginSuccessAction(meDto));
      });
    })
  );
}
