import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {AppState} from "../states/app.state";
import {Store} from "@ngrx/store";
import * as inviteActions from "../actions/invite.action";
import {InviteAcceptRequestAction, InviteActionEnum, InvitersRequestAction} from "../actions/invite.action";
import * as waitActions from "../actions/wait.action";
import {WaitRequestAction} from "../actions/wait.action";
import {GuestAuthenticationService} from "../../api/web-console/services/guest-authentication.service";
import {UserGroupService} from "../../api/web-console/services/user-group.service";
import {catchError, map, switchMap} from "rxjs/operators";
import {of} from "rxjs";
import {Router} from "@angular/router";

@Injectable()
export class InviteEffects {
  constructor(
    private router: Router,
    private _actions$: Actions,
    private _store: Store<AppState>,
    private guestService: GuestAuthenticationService,
    private userService: UserGroupService
  ) {}

  @Effect()
  getInviterList = this._actions$.pipe(
    ofType<InvitersRequestAction>(InviteActionEnum.INVITERS_REQUEST),
    switchMap(() => {
      this._store.dispatch(new WaitRequestAction());
      return this.userService.getInviterGroups().pipe(
        map(inviterListDto  => {
          this._store.dispatch(new waitActions.WaitExitAction());
          return new inviteActions.InvitersSuccessAction(inviterListDto);
        }),
        catchError(error => {
          this._store.dispatch(new waitActions.WaitExitAction());
          return of(new inviteActions.InvitersErrorAction(error));
        })
      )
    })
  );

  @Effect()
  acceptInvite = this._actions$.pipe(
    ofType<InviteAcceptRequestAction>(InviteActionEnum.INVITE_ACCEPT_REQUEST),
    map(action => action.payload),
    switchMap(inviterDto => {
      this._store.dispatch(new WaitRequestAction());
      return this.userService.acceptInviteRequest({ body: inviterDto }).pipe(
        map(() => {
          this._store.dispatch(new waitActions.WaitExitAction());
          return new inviteActions.InviteAcceptSuccessAction(inviterDto);
        }),
        catchError(error => {
          this._store.dispatch(new waitActions.WaitExitAction());
          return of(new inviteActions.InvitersErrorAction(error));
        })
      )
    })
  );
}
