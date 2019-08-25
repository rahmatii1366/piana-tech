import {RouterReducerState} from "@ngrx/router-store";
import {MeState} from "./me.state";
import {initialWaitState, WaitState} from "./wait.state";
import {AgeLevelState, initialAgeLevelState} from "./age-level.state";
import {GroupState, initialGroupState} from "./group.state";
import {initialInviteState, InviteState} from "./invite.state";

export interface AppState {
  router?: RouterReducerState,
  me: MeState
  wait: WaitState
  ageLevelState: AgeLevelState
  groupState: GroupState,
  inviteState: InviteState
}

export const initialAppState: AppState = {
  me: null,
  wait: initialWaitState,
  ageLevelState: initialAgeLevelState,
  groupState: initialGroupState,
  inviteState: initialInviteState
}

export function getInitialState(): AppState {
  return initialAppState;
}
