import {AppState} from "../states/app.state";
import {createSelector} from "@ngrx/store";
import {UserState} from "../states/userState";

const selectUser =  (state: AppState) => state.user;

export const selectMe = createSelector(
  selectUser,
  (state: UserState) => state.meDto
);
