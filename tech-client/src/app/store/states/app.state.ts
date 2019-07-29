import {RouterReducerState} from "@ngrx/router-store";
import {UserState} from "./userState";

export interface AppState {
  router?: RouterReducerState,
  user: UserState
}

export const initialAppState: AppState = {
  user: null
}

export function getInitialState(): AppState {
  return initialAppState;
}
