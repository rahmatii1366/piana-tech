import {ActionReducerMap} from "@ngrx/store";
import {IAppState} from "../states/app.state";
import {routerReducer} from "@ngrx/router-store";
import {UserReducers} from "./user.reducer";

export const appReducers: ActionReducerMap<IAppState, any> = {
  router: routerReducer,
  user: UserReducers,
}
