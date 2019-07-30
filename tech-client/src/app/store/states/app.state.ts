import {RouterReducerState} from "@ngrx/router-store";
import {MeState} from "./meState";

export interface AppState {
  router?: RouterReducerState,
  me: MeState
}

export const initialAppState: AppState = {
  me: null
}

export function getInitialState(): AppState {
  return initialAppState;
}
