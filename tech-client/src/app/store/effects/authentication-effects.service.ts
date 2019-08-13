import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {AppState} from "../states/app.state";
import {Store} from "@ngrx/store";
import * as authenticationActions from "../actions/authentication.action";
import * as waitActions from "../actions/wait.action";
import {
  AuthenticationActionEnum,
  ForgetPasswordNavigateAction,
  ForgetPasswordRequestAction,
  LoginNavigateAction,
  LoginRequestAction,
  LogoutNavigateAction,
  LogoutRequestAction,
  SignupNavigateAction,
  SignupRequestAction,
  VerifyTokenNavigateAction,
  VerifyTokenRequestAction
} from "../actions/authentication.action";

import {GuestService} from "../../api/web-console/services/guest.service";
import {catchError, map, switchMap, withLatestFrom} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {Router} from "@angular/router";
import {UserService} from "../../api/web-console/services/user.service";
import {WaitExitAction, WaitRequestAction} from "../actions/wait.action";

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
      this._store.dispatch(new WaitRequestAction());
      return this.guestService.signup(signupDto).pipe(
        map(tokenRequiredDto  => {
          this._store.dispatch(new waitActions.WaitExitAction());
          return new authenticationActions.SignupNavigateAction(tokenRequiredDto);
        }),
        catchError(error => {
          this._store.dispatch(new waitActions.WaitExitAction());
          return of(new authenticationActions.SignupErrorAction(error));
        })
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
      this._store.dispatch(new WaitRequestAction());
      return this.guestService.login(loginDto).pipe(
        map(meDto => {
          this._store.dispatch(new waitActions.WaitExitAction());
          return new authenticationActions.LoginNavigateAction(meDto);
        }),
        catchError(error => {
          this._store.dispatch(new waitActions.WaitExitAction());
          return of(new authenticationActions.LoginErrorAction(error));
        })
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
      this._store.dispatch(new WaitRequestAction());
      return this.guestService.forgetPassword(forgetPasswordDto).pipe(
        map(tokenRequiredDto => {
          this._store.dispatch(new waitActions.WaitExitAction());
          return new authenticationActions.ForgetPasswordNavigateAction(tokenRequiredDto);
        }),
        catchError(error => {
          this._store.dispatch(new waitActions.WaitExitAction());
          return of(new authenticationActions.ForgetPasswordErrorAction(error));
        })
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
      this._store.dispatch(new WaitRequestAction());
      return this.guestService.verifyToken(verifyTokenDto).pipe(
        map(meDto => {
          this._store.dispatch(new waitActions.WaitExitAction());
          return new authenticationActions.VerifyTokenNavigateAction(meDto);
        }),
        catchError(error => {
          this._store.dispatch(new waitActions.WaitExitAction());
          return of(new authenticationActions.VerifyTokenErrorAction(error));
        })
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
      this._store.dispatch(new WaitRequestAction());
      return this.userService.logout().pipe(
        map(() => {
          this._store.dispatch(new waitActions.WaitExitAction());
          return new authenticationActions.LogoutNavigateAction();
        }),
        catchError(error => {
          this._store.dispatch(new waitActions.WaitExitAction());
          return of(new authenticationActions.LogoutErrorAction(error));
        })
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
