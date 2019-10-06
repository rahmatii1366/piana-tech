import {RouterReducerState} from "@ngrx/router-store";
import {MeState} from "./me.state";
import {initialWaitState, WaitState} from "./wait.state";
import {AgeLevelState, initialAgeLevelState} from "./age-level.state";
import {GroupState, initialGroupState} from "./group.state";
import {initialInviteState, InviteState} from "./invite.state";
import {ActiveGroupState, initialActiveGroupState} from "./active-group.state";
import {initialPositionState, PositionState} from "./position.state";
import {PlayerState} from "./player.state";

export interface AppState {
  router?: RouterReducerState,
  me: MeState
  playerState: PlayerState
  wait: WaitState
  ageLevelState: AgeLevelState
  positionState: PositionState
  groupState: GroupState,
  inviteState: InviteState,
  activeGroup: ActiveGroupState
}

export const initialAppState: AppState = {
  me: null,
  playerState: null,
  wait: initialWaitState,
  ageLevelState: initialAgeLevelState,
  positionState: initialPositionState,
  groupState: initialGroupState,
  inviteState: initialInviteState,
  activeGroup: initialActiveGroupState
}

export function getInitialState(): AppState {
  return initialAppState;
}
