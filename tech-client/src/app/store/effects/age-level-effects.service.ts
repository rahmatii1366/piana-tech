import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {AppState} from "../states/app.state";
import {Store} from "@ngrx/store";
import * as ageLevelsActions from "../actions/age-level.action";
import {AgeLevelActionEnum, AgeLevelRequestAction} from "../actions/age-level.action";
import {GuestGroupService} from "../../api/web-console/services/guest-group.service";
import {catchError, map, switchMap, withLatestFrom} from "rxjs/operators";
import {of} from "rxjs";
import {Router} from "@angular/router";
import {UserGroupService} from "../../api/web-console/services/user-group.service";
import {WaitExitAction, WaitRequestAction} from "../actions/wait.action";

@Injectable()
export class AgeLevelEffects {
  constructor(
    private router: Router,
    private _actions$: Actions,
    private _store: Store<AppState>,
    private guestService: GuestGroupService,
    private userService: UserGroupService
  ) {}

  @Effect()
  getAllAgeLevels$ = this._actions$.pipe(
    ofType<AgeLevelRequestAction>(AgeLevelActionEnum.AGE_LEVEL_REQUEST),
    withLatestFrom(this._store),
    map(([action, store]) => store.ageLevelState.ageLevels),
    switchMap(ageLevels => {
      if(ageLevels != null)
        return of(new ageLevelsActions.AgeLevelErrorAction(ageLevels));
      else {
        this._store.dispatch(new WaitRequestAction());
        return this.guestService.getAgeLevels().pipe(
          map(ageLevels => {
            this._store.dispatch(new WaitExitAction());
            return new ageLevelsActions.AgeLevelSuccessAction(ageLevels);
          }),
          catchError(error => {
            this._store.dispatch(new WaitExitAction());
            return of(new ageLevelsActions.AgeLevelErrorAction(error));
          })
        )
      }
    })
  );
}
