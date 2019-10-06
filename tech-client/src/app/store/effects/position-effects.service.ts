import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {AppState} from "../states/app.state";
import {Store} from "@ngrx/store";
import * as positionActions from "../actions/position.action";
import {PositionActionEnum, PositionRequestAction} from "../actions/position.action";
import {catchError, map, switchMap, withLatestFrom} from "rxjs/operators";
import {of} from "rxjs";
import {Router} from "@angular/router";
import {WaitExitAction, WaitRequestAction} from "../actions/wait.action";
import {GuestPlayerService} from "../../api/web-console/services/guest-player.service";

@Injectable()
export class PositionEffects {
  constructor(
    private router: Router,
    private _actions$: Actions,
    private _store: Store<AppState>,
    private guestService: GuestPlayerService
  ) {}

  @Effect()
  getPositions$ = this._actions$.pipe(
    ofType<PositionRequestAction>(PositionActionEnum.POSITION_REQUEST),
    withLatestFrom(this._store),
    map(([action, store]) => store.positionState.positions),
    switchMap(positions => {
      if(positions != null)
        return of(new positionActions.PositionErrorAction(positions));
      else {
        this._store.dispatch(new WaitRequestAction());
        return this.guestService.getPositions().pipe(
          map(positions => {
            this._store.dispatch(new WaitExitAction());
            return new positionActions.PositionSuccessAction(positions);
          }),
          catchError(error => {
            this._store.dispatch(new WaitExitAction());
            return of(new positionActions.PositionErrorAction(error));
          })
        )
      }
    })
  );
}
