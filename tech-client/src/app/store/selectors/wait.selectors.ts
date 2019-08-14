import {AppState} from "../states/app.state";
import {createSelector} from "@ngrx/store";
import {WaitState} from "../states/wait.state";

const selectWait =  (state: AppState) => state.wait;

export const selectShowSpinner = createSelector(
  selectWait,
  (state: WaitState) => state.showSpinner
);
