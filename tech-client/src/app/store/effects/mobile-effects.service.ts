import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {AppState} from "../states/app.state";
import {Store} from "@ngrx/store";
import {
  ESignupAction,
  SignupActions,
  SignupEmailVerifyActions,
  SignupEmailVerifyNavigateActions,
  SignupNavigateActions
} from "../actions/signup.action";
import {GuestService} from "../../api/web-console/services/guest.service";
import {catchError, map, switchMap} from "rxjs/operators";
import * as signupActions from '../actions/signup.action';
import {Observable, of} from "rxjs";
import {Router} from "@angular/router";
import {VerifyCodeDto} from "../../api/web-console/models/verify-code-dto";
import {VerifyEmailService} from "../../api/web-console/services/verify-email.service";

@Injectable()
export class MobileEffects {
  constructor(
    private router: Router,
    private _actions$: Actions,
    private _store: Store<AppState>,
    private guestService: GuestService,
    private verifyEmailService: VerifyEmailService
  ) {}

  @Effect()
  signup$ = this._actions$.pipe(
    ofType<SignupActions>(ESignupAction.SIGNUP_REQUEST),
    map(action => action.payload),
    switchMap(signupDto => {
      return this.guestService.signUp(signupDto).pipe(
        map(success => new signupActions.SignupNavigateActions(success)),
        catchError(error => of(new signupActions.SignupErrorActions(error)))
      )
    })
  );

  @Effect()
  signupNavigate$ = this._actions$.pipe(
    ofType<SignupNavigateActions>(ESignupAction.SIGNUP_REQUEST_NAVIGATE),
    map(action => action.payload),
    switchMap(meDto => {
      return new Observable(observer => {
        this.router.navigateByUrl("signup/email-verify")
        observer.next(new signupActions.SignupSuccessActions(meDto));
      });
    })
  );

  @Effect()
  signupEmailVerify$ = this._actions$.pipe(
    ofType<SignupEmailVerifyActions>(ESignupAction.SIGNUP_EMAIL_VERIFY_REQUEST),
    map(action => action.payload),
    switchMap(verifyCodeDto => {
      return this.verifyEmailService.signUpVerify(verifyCodeDto).pipe(
        map(success => new signupActions.SignupEmailVerifyNavigateActions(success)),
        catchError(error => of(new signupActions.SignupEmailVerifyErrorActions(error)))
      )
    })
  );

  @Effect()
  signupEmailVerifyNavigate$ = this._actions$.pipe(
    ofType<SignupEmailVerifyNavigateActions>(ESignupAction.SIGNUP_EMAIL_VERIFY_NAVIGATE),
    map(action => action.payload),
    switchMap(meDto => {
      return new Observable(observer => {
        this.router.navigateByUrl("signup/info")
        observer.next(new signupActions.SignupEmailVerifySuccessActions(meDto));
      });
    })
  );
}
