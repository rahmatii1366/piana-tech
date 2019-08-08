import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {AppState} from "../states/app.state";
import {Store} from "@ngrx/store";
import {
  MobileActionEnum,
  MobileSignupAction,
  MobileSignupNavigateAction,
  MobileLoginAction,
  MobileLoginNavigateAction
} from "../actions/mobile.action";

import {GuestService} from "../../api/web-console/services/guest.service";
import {catchError, map, switchMap} from "rxjs/operators";
import * as mobileActions from '../actions/mobile.action';
import {Observable, of} from "rxjs";
import {Router} from "@angular/router";

@Injectable()
export class MobileEffects {
  constructor(
    private router: Router,
    private _actions$: Actions,
    private _store: Store<AppState>,
    private guestService: GuestService
  ) {}

  @Effect()
  mobileSignup$ = this._actions$.pipe(
    ofType<MobileSignupAction>(MobileActionEnum.MOBILE_SIGNUP_REQUEST),
    map(action => action.payload),
    switchMap(mobileSignupDto => {
      return this.guestService.mobileSignup(mobileSignupDto).pipe(
        map(success => new mobileActions.MobileSignupNavigateAction(success)),
        catchError(error => of(new mobileActions.MobileSignupErrorAction(error)))
      )
    })
  );

  @Effect()
  mobileSignupNavigate$ = this._actions$.pipe(
    ofType<MobileSignupNavigateAction>(MobileActionEnum.MOBILE_SIGNUP_NAVIGATE),
    map(action => action.payload),
    switchMap(meDto => {
      return new Observable(observer => {
        this.router.navigateByUrl("dashboard")
        observer.next(new mobileActions.MobileSignupSuccessAction(meDto));
      });
    })
  );

  @Effect()
  mobileLogin$ = this._actions$.pipe(
    ofType<MobileLoginAction>(MobileActionEnum.MOBILE_LOGIN_REQUEST),
    map(action => action.payload),
    switchMap(mobileLoginDto => {
      return this.guestService.mobileLogin(mobileLoginDto).pipe(
        map(success => new mobileActions.MobileLoginNavigateAction(success)),
        catchError(error => of(new mobileActions.MobileLoginErrorAction(error)))
      )
    })
  );

  @Effect()
  mobileLoginNavigate$ = this._actions$.pipe(
    ofType<MobileSignupNavigateAction>(MobileActionEnum.MOBILE_LOGIN_NAVIGATE),
    map(action => action.payload),
    switchMap(meDto => {
      return new Observable(observer => {
        this.router.navigateByUrl("dashboard")
        observer.next(new mobileActions.MobileLoginSuccessAction(meDto));
      });
    })
  );
}
