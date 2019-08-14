import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {AppState} from "../states/app.state";
import {Store} from "@ngrx/store";
import * as groupActions from "../actions/group.action";
import * as waitActions from "../actions/wait.action";
import {GuestService} from "../../api/web-console/services/guest.service";
import {UserService} from "../../api/web-console/services/user.service";
import {catchError, map, switchMap, withLatestFrom} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {Router} from "@angular/router";
import {WaitRequestAction} from "../actions/wait.action";
import {
  GroupActionEnum,
  GroupCreateNavigateAction,
  GroupCreateRequestAction,
  GroupGetRequestAction
} from "../actions/group.action";

@Injectable()
export class GroupEffects {
  constructor(
    private router: Router,
    private _actions$: Actions,
    private _store: Store<AppState>,
    private guestService: GuestService,
    private userService: UserService
  ) {}

  @Effect()
  createGroup = this._actions$.pipe(
    ofType<GroupCreateRequestAction>(GroupActionEnum.GROUP_CREATE_REQUEST),
    map(action => action.payload),
    switchMap(createGroupDto => {
      this._store.dispatch(new WaitRequestAction());
      return this.userService.createGroup(createGroupDto).pipe(
        map(createGroupResponse  => {
          this._store.dispatch(new waitActions.WaitExitAction());
          return new groupActions.GroupCreateNavigateAction(createGroupResponse);
        }),
        catchError(error => {
          this._store.dispatch(new waitActions.WaitExitAction());
          return of(new groupActions.GroupCreateErrorAction(error));
        })
      )
    })
  );

  @Effect()
  createGroupNavigate$ = this._actions$.pipe(
    ofType<GroupCreateNavigateAction>(GroupActionEnum.GROUP_CREATE_NAVIGATE),
    map(action => action.payload),
    switchMap(createGroupDto => {
      return new Observable(observer => {
        this.router.navigateByUrl("group/admin-view")
        observer.next(new groupActions.GroupCreateSuccessAction(createGroupDto));
      });
    })
  );

  @Effect()
  getGroup$ = this._actions$.pipe(
    ofType<GroupGetRequestAction>(GroupActionEnum.GROUP_GET_REQUEST),
    switchMap(() => {
      this._store.dispatch(new WaitRequestAction());
      return this.userService.getGroup().pipe(
        map(groupDto => {
          this._store.dispatch(new waitActions.WaitExitAction());
          return new groupActions.GroupGetSuccessAction(groupDto);
        }),
        catchError(error => {
          this._store.dispatch(new waitActions.WaitExitAction());
          return of(new groupActions.GroupGetErrorAction(error));
        })
      )
    })
  );
}
