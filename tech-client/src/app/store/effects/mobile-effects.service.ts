import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {AppState} from "../states/app.state";
import {Store} from "@ngrx/store";
import {
  MobileActionEnum,
  MobileAction,
  MobileSuccessAction,
  MobileErrorAction,
  MobileNavigateAction,
  MobileWaitAction
} from "../actions/mobile.action";

import {GuestService} from "../../api/web-console/services/guest.service";
import {catchError, map, switchMap} from "rxjs/operators";
import * as mobileActions from '../actions/mobile.action';
import {Observable, of} from "rxjs";
import {Router} from "@angular/router";
import {VerifyCodeDto} from "../../api/web-console/models/verify-code-dto";

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
    ofType<MobileAction>(MobileActionEnum.MOBILE_REQUEST),
    map(action => action.payload),
    switchMap(mobileSignupDto => {
      return this.guestService.mobileSignup(mobileSignupDto).pipe(
        map(success => new mobileActions.MobileNavigateAction(success)),
        catchError(error => of(new mobileActions.MobileErrorAction(error)))
      )
    })
  );

  @Effect()
  mobileSignupNavigate$ = this._actions$.pipe(
    ofType<MobileNavigateAction>(MobileActionEnum.MOBILE_REQUEST_NAVIGATE),
    map(action => action.payload),
    switchMap(meDto => {
      return new Observable(observer => {
        this.router.navigateByUrl("dashboard")
        observer.next(new mobileActions.MobileSuccessAction(meDto));
      });
    })
  );
}
