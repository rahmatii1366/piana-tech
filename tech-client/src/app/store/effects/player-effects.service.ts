import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {AppState} from "../states/app.state";
import {Store} from "@ngrx/store";
import * as playerActions from "../actions/player.action";
import {
  PlayerActionEnum,
  PlayerGetInfoRequestAction,
  PlayerGetPositionRequestAction,
  PlayerUpdateInfoRequestAction,
  PlayerUpdatePositionRequestAction
} from "../actions/player.action";
import * as waitActions from "../actions/wait.action";
import {WaitRequestAction} from "../actions/wait.action";
import {catchError, map, switchMap} from "rxjs/operators";
import {of} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {GuestPlayerService} from "../../api/web-console/services/guest-player.service";
import {UserPlayerService} from "../../api/web-console/services/user-player.service";

@Injectable()
export class PlayerEffects {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _actions$: Actions,
    private _store: Store<AppState>,
    private guestPlayerService: GuestPlayerService,
    private userPlayerService: UserPlayerService
  ) {}

  @Effect()
  getPlayerInfo$ = this._actions$.pipe(
    ofType<PlayerGetInfoRequestAction>(PlayerActionEnum.PLAYER_GET_INFO_REQUEST),
    switchMap(() => {
      this._store.dispatch(new WaitRequestAction());
      return this.userPlayerService.getPlayerInfo().pipe(
        map(playerInfoDto => {
          this._store.dispatch(new waitActions.WaitExitAction());
          return new playerActions.PlayerGetInfoSuccessAction(playerInfoDto);
        }),
        catchError(error => {
          this._store.dispatch(new waitActions.WaitExitAction());
          return of(new playerActions.PlayerGetInfoErrorAction(error));
        })
      )
    })
  );

  @Effect()
  updatePlayerInfo$ = this._actions$.pipe(
    ofType<PlayerUpdateInfoRequestAction>(PlayerActionEnum.PLAYER_UPDATE_INFO_REQUEST),
    map(action => action.payload),
    switchMap(playerInfoDto => {
      this._store.dispatch(new WaitRequestAction());
      return this.userPlayerService.updatePlayerInfo({ body: playerInfoDto}).pipe(
        map(() => {
          this._store.dispatch(new waitActions.WaitExitAction());
          return new playerActions.PlayerUpdateInfoSuccessAction(playerInfoDto);
        }),
        catchError(error => {
          this._store.dispatch(new waitActions.WaitExitAction());
          return of(new playerActions.PlayerUpdateInfoErrorAction(error));
        })
      )
    })
  );

  @Effect()
  getPlayerPosition$ = this._actions$.pipe(
    ofType<PlayerGetPositionRequestAction>(PlayerActionEnum.PLAYER_GET_POSITION_REQUEST),
    switchMap(() => {
      this._store.dispatch(new WaitRequestAction());
      return this.userPlayerService.getPlayerPosition().pipe(
        map(playerPositionDto => {
          this._store.dispatch(new waitActions.WaitExitAction());
          return new playerActions.PlayerGetPositionSuccessAction(playerPositionDto);
        }),
        catchError(error => {
          this._store.dispatch(new waitActions.WaitExitAction());
          return of(new playerActions.PlayerGetPositionErrorAction(error));
        })
      )
    })
  );

  @Effect()
  updatePlayerPosition$ = this._actions$.pipe(
    ofType<PlayerUpdatePositionRequestAction>(PlayerActionEnum.PLAYER_UPDATE_POSITION_REQUEST),
    map(action => action.payload),
    switchMap(playerPositionDto => {
      this._store.dispatch(new WaitRequestAction());
      return this.userPlayerService.updatePlayerPosition({ body: playerPositionDto }).pipe(
        map(() => {
          this._store.dispatch(new waitActions.WaitExitAction());
          return new playerActions.PlayerUpdatePositionSuccessAction(playerPositionDto);
        }),
        catchError(error => {
          this._store.dispatch(new waitActions.WaitExitAction());
          return of(new playerActions.PlayerUpdatePositionErrorAction(error));
        })
      )
    })
  );
}
