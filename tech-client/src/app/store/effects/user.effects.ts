import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {AppState} from "../states/app.state";
import {Store} from "@ngrx/store";
import {EUserAction, SignupActions, SignupNavigateActions} from "../actions/user.action";
import {GuestService} from "../../api/web-console/services/guest.service";
import {catchError, map, switchMap} from "rxjs/operators";
import * as userActions from '../actions/user.action';
import {Observable, of} from "rxjs";
import {Router} from "@angular/router";

@Injectable()
export class UserEffects {
  @Effect()
  signup$ = this._actions$.pipe(
    ofType<SignupActions>(EUserAction.SIGNUP_REQUEST),
    map(action => action.payload),
    switchMap(signupDto => {
      return this.guestService.signUp(signupDto).pipe(
        map(success => new userActions.SignupNavigateActions(success)),
        catchError(error => of(new userActions.SignupErrorActions(error)))
      )
    })
  );

  @Effect()
  signupNavigate$ = this._actions$.pipe(
    ofType<SignupNavigateActions>(EUserAction.SIGNUP_REQUEST_NAVIGATE),
    map(action => action.payload),
    switchMap(meDto => {
      return new Observable(observer => {
        this.router.navigateByUrl("signup/email-verify")
        observer.next(new userActions.SignupSuccessActions(meDto));
      });
    })
  );

  constructor(
    private router: Router,
    private _actions$: Actions,
    private _store: Store<AppState>,
    private guestService: GuestService
  ) {}
}
