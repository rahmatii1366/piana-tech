import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {AppState} from "../states/app.state";
import {Store} from "@ngrx/store";
import * as groupActions from "../actions/group.action";
import * as waitActions from "../actions/wait.action";
import {GuestGroupService} from "../../api/web-console/services/guest-group.service";
import {UserGroupService} from "../../api/web-console/services/user-group.service";
import {catchError, map, switchMap, withLatestFrom} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {WaitRequestAction} from "../actions/wait.action";
import {
  GroupActionEnum,
  GroupCreateNavigateAction,
  GroupCreateRequestAction,
  GroupGetRequestAction, GroupUpdateNavigateAction, GroupUpdateRequestAction
} from "../actions/group.action";

@Injectable()
export class GroupEffects {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _actions$: Actions,
    private _store: Store<AppState>,
    private guestService: GuestGroupService,
    private userService: UserGroupService
  ) {}

  @Effect()
  createGroup = this._actions$.pipe(
    ofType<GroupCreateRequestAction>(GroupActionEnum.GROUP_CREATE_REQUEST),
    map(action => action.payload),
    switchMap(createGroupDto => {
      this._store.dispatch(new WaitRequestAction());
      return this.userService.createGroup({ body: createGroupDto }).pipe(
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
      // console.log(this.activatedRoute.url)
      // console.log(this.activatedRoute.toString())
      // console.log(this.activatedRoute.snapshot)
      return new Observable(observer => {
        this.router.navigate(["dashboard/owned/admin/" + createGroupDto.name + "/group-dashboard"])
        // this.router.navigate(["dashboard/owned/group-list"])
        observer.next(new groupActions.GroupCreateSuccessAction(createGroupDto));
      });
    })
  );

  @Effect()
  updateGroup = this._actions$.pipe(
    ofType<GroupUpdateRequestAction>(GroupActionEnum.GROUP_UPDATE_REQUEST),
    map(action => action.payload),
    switchMap(updateGroupDto => {
      this._store.dispatch(new WaitRequestAction());
      return this.userService.updateGroup({ body: updateGroupDto }).pipe(
        map(groupDto => {
          this._store.dispatch(new waitActions.WaitExitAction());
          return new groupActions.GroupUpdateNavigateAction(groupDto);
        }),
        catchError(error => {
          this._store.dispatch(new waitActions.WaitExitAction());
          return of(new groupActions.GroupUpdateErrorAction(error));
        })
      )
    })
  );

  @Effect()
  updateGroupNavigate$ = this._actions$.pipe(
    ofType<GroupUpdateNavigateAction>(GroupActionEnum.GROUP_UPDATE_NAVIGATE),
    map(action => action.payload),
    switchMap(groupDto => {
      return new Observable(observer => {
        this.router.navigate(["dashboard/owned/group-list"]);
        observer.next(new groupActions.GroupUpdateSuccessAction(groupDto));
      });
    })
  );

  @Effect()
  getGroup$ = this._actions$.pipe(
    ofType<GroupGetRequestAction>(GroupActionEnum.GROUP_GET_REQUEST),
    switchMap(() => {
      this._store.dispatch(new WaitRequestAction());
      return this.userService.getOwnGroups().pipe(
        map(groupDtoList => {
          this._store.dispatch(new waitActions.WaitExitAction());
          return new groupActions.GroupGetSuccessAction(groupDtoList);
        }),
        catchError(error => {
          this._store.dispatch(new waitActions.WaitExitAction());
          return of(new groupActions.GroupGetErrorAction(error));
        })
      )
    })
  );
}
