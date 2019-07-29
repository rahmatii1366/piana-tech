import {ActionReducerMap} from "@ngrx/store";
import {AppState} from "../states/app.state";
import {routerReducer} from "@ngrx/router-store";
import {UserReducers} from "./user.reducer";

export const appReducers: ActionReducerMap<AppState, any> = {
  router: routerReducer,
  user: UserReducers,
}
