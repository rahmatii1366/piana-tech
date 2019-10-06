import {ActionReducerMap} from "@ngrx/store";
import {AppState} from "../states/app.state";
import {routerReducer} from "@ngrx/router-store";
import {AuthenticationReducers} from "./authentication.reducer";
import {WaitReducers} from "./wait.reducer";
import {AgeLevelReducers} from "./age-level.reducer";
import {GroupReducers} from "./group.reducer";
import {InviteReducers} from "./invite.reducer";
import {ActiveGroupReducers} from "./active-group.reducer";
import {PositionReducers} from "./position.reducer";
import {PlayerReducers} from "./player.reducer";

export const appReducers: ActionReducerMap<AppState, any> = {
  router: routerReducer,
  me: AuthenticationReducers,
  playerState: PlayerReducers,
  wait: WaitReducers,
  ageLevelState: AgeLevelReducers,
  groupState: GroupReducers,
  inviteState: InviteReducers,
  activeGroup: ActiveGroupReducers,
  positionState: PositionReducers,
}
