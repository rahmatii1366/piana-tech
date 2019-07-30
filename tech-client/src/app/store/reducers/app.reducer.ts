import {ActionReducerMap} from "@ngrx/store";
import {AppState} from "../states/app.state";
import {routerReducer} from "@ngrx/router-store";
import {SignupReducers} from "./signup.reducer";

export const appReducers: ActionReducerMap<AppState, any> = {
  router: routerReducer,
  me: SignupReducers,
}
