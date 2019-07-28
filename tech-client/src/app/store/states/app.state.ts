import {RouterReducerState} from "@ngrx/router-store";
import {IUserState} from "./user.state";

export interface IAppState {
  router?: RouterReducerState,
  user: IUserState
}

export const initialAppState: IAppState = {
  user: null
}

export function getInitialState(): IAppState {
  return initialAppState;
}
