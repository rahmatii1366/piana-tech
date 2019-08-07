import {RouterReducerState} from "@ngrx/router-store";
import {MeState} from "./meState";

export interface AppState {
  router?: RouterReducerState,
  me: MeState,
  we: MeState
}

export const initialAppState: AppState = {
  me: null,
  we: null
}

export function getInitialState(): AppState {
  return initialAppState;
}
