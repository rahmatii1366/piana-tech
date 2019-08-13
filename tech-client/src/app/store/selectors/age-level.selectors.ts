import {AppState} from "../states/app.state";
import {createSelector} from "@ngrx/store";
import {MeState} from "../states/me.state";
import {WaitState} from "../states/wait.state";
import {AgeLevelState} from "../states/age-level.state";

const selectAgeLevel =  (state: AppState) => state.ageLevelState;

export const selectAgeLevels = createSelector(
  selectAgeLevel,
  (state: AgeLevelState) => state.ageLevels
);
