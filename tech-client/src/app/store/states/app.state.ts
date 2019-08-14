import {RouterReducerState} from "@ngrx/router-store";
import {MeState} from "./me.state";
import {initialWaitState, WaitState} from "./wait.state";
import {AgeLevelState, initialAgeLevelState} from "./age-level.state";
import {GroupState, initialGroupState} from "./group.state";

export interface AppState {
  router?: RouterReducerState,
  me: MeState
  wait: WaitState
  ageLevelState: AgeLevelState
  groupState: GroupState
}

export const initialAppState: AppState = {
  me: null,
  wait: initialWaitState,
  ageLevelState: initialAgeLevelState,
  groupState: initialGroupState
}

export function getInitialState(): AppState {
  return initialAppState;
}
