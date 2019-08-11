import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {AppState, getInitialState} from "../states/app.state";
import {select, Store} from "@ngrx/store";
import {
  AuthenticationActionEnum,
  SignupRequestAction,
  SignupNavigateAction,
  LoginRequestAction,
  LoginNavigateAction,
  VerifyTokenRequestAction,
  ForgetPasswordRequestAction,
  ForgetPasswordNavigateAction,
  VerifyTokenNavigateAction,
  LogoutRequestAction, LogoutNavigateAction
} from "../actions/authentication.action";

import {GuestService} from "../../api/web-console/services/guest.service";
import {catchError, filter, map, switchMap, withLatestFrom} from "rxjs/operators";
import * as authenticationActions from '../actions/authentication.action';
import {Observable, of} from "rxjs";
import {Router} from "@angular/router";
import {UserService} from "../../api/web-console/services/user.service";
import {initialMeState} from "../states/meState";
import {selectTokenRequiredDto} from "../selectors/me.selectors";

@Injectable()
export class AuthenticationEffects {
  constructor(
    private router: Router,
    private _actions$: Actions,
    private _store: Store<AppState>,
    private guestService: GuestService,
    private userService: UserService
  ) {}

  @Effect()
  signup$ = this._actions$.pipe(
    ofType<SignupRequestAction>(AuthenticationActionEnum.SIGNUP_REQUEST),
    map(action => action.payload),
    switchMap(signupDto => {
      return this.guestService.signup(signupDto).pipe(
        map(tokenRequiredDto  => new authenticationActions.SignupNavigateAction(tokenRequiredDto )),
        catchError(error => of(new authenticationActions.SignupErrorAction(error)))
      )
    })
  );

  @Effect()
  signupNavigate$ = this._actions$.pipe(
    ofType<SignupNavigateAction>(AuthenticationActionEnum.SIGNUP_NAVIGATE),
    map(action => action.payload),
    switchMap(tokenRequiredDto => {
      return new Observable(observer => {
        this.router.navigateByUrl("authentication/verify-token")
        observer.next(new authenticationActions.SignupSuccessAction(tokenRequiredDto));
      });
    })
  );

  @Effect()
  login$ = this._actions$.pipe(
    ofType<LoginRequestAction>(AuthenticationActionEnum.LOGIN_REQUEST),
    map(action => action.payload),
    switchMap(loginDto => {
      return this.guestService.login(loginDto).pipe(
        map(meDto => new authenticationActions.LoginNavigateAction(meDto)),
        catchError(error => of(new authenticationActions.LoginErrorAction(error)))
      )
    })
  );

  @Effect()
  loginNavigate$ = this._actions$.pipe(
    ofType<LoginNavigateAction>(AuthenticationActionEnum.LOGIN_NAVIGATE),
    map(action => action.payload),
    switchMap(meDto => {
      return new Observable(observer => {
        this.router.navigateByUrl("dashboard")
        observer.next(new authenticationActions.LoginSuccessAction(meDto));
      });
    })
  );

  @Effect()
  forgetPassword$ = this._actions$.pipe(
    ofType<ForgetPasswordRequestAction>(AuthenticationActionEnum.FORGET_PASSWORD_REQUEST),
    map(action => action.payload),
    switchMap(forgetPasswordDto => {
      return this.guestService.forgetPassword(forgetPasswordDto).pipe(
        map(tokenRequiredDto => new authenticationActions.ForgetPasswordNavigateAction(tokenRequiredDto)),
        catchError(error => of(new authenticationActions.ForgetPasswordErrorAction(error)))
      )
    })
  );

  @Effect()
  forgetPasswordNavigate$ = this._actions$.pipe(
    ofType<ForgetPasswordNavigateAction>(AuthenticationActionEnum.FORGET_PASSWORD_NAVIGATE),
    map(action => action.payload),
    switchMap(tokenRequiredDto => {
      return new Observable(observer => {
        this.router.navigateByUrl("authentication/verify-token")
        observer.next(new authenticationActions.ForgetPasswordSuccessAction(tokenRequiredDto));
      });
    })
  );

  @Effect()
  verifyToken$ = this._actions$.pipe(
    ofType<VerifyTokenRequestAction>(AuthenticationActionEnum.VERIFY_TOKEN_REQUEST),
    withLatestFrom(this._store),
    map(([action, store]) => {
      action.payload.tokenType = store.me.tokenRequiredDto.tokenType;
      action.payload.tokenAction = store.me.tokenRequiredDto.tokenAction;
      return action.payload;
    }),
    switchMap(verifyTokenDto => {
      console.log(verifyTokenDto);
      return this.userService.verifyToken(verifyTokenDto).pipe(
        map(meDto => new authenticationActions.VerifyTokenNavigateAction(meDto)),
        catchError(error => of(new authenticationActions.VerifyTokenErrorAction(error)))
      )
    })
  );

  @Effect()
  verifyTokenNavigate$ = this._actions$.pipe(
    ofType<VerifyTokenNavigateAction>(AuthenticationActionEnum.VERIFY_TOKEN_NAVIGATE),
    map(action => action.payload),
    switchMap(meDto => {
      return new Observable(observer => {
        this.router.navigateByUrl("dashboard")
        observer.next(new authenticationActions.VerifyTokenSuccessAction(meDto));
      });
    })
  );

  @Effect()
  logout$ = this._actions$.pipe(
    ofType<LogoutRequestAction>(AuthenticationActionEnum.LOGOUT_REQUEST),
    switchMap(() => {
      return this.userService.logout().pipe(
        map(() => new authenticationActions.LogoutNavigateAction()),
        catchError(error => of(new authenticationActions.LogoutErrorAction(error)))
      )
    })
  );

  @Effect()
  logoutNavigate$ = this._actions$.pipe(
    ofType<LogoutNavigateAction>(AuthenticationActionEnum.LOGOUT_NAVIGATE),
    switchMap(() => {
      return new Observable(observer => {
        this.router.navigateByUrl("authentication")
        observer.next(new authenticationActions.LogoutSuccessAction());
      });
    })
  );
}
