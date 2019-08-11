import {AppState} from "../states/app.state";
import {createSelector} from "@ngrx/store";
import {MeState} from "../states/meState";

const selectMe =  (state: AppState) => state.me;

export const selectMeDto = createSelector(
  selectMe,
  (state: MeState) => state.meDto
);

export const selectTokenRequiredDto = createSelector(
  selectMe,
  (state: MeState) => state.tokenRequiredDto
);
