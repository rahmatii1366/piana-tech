import {AppState} from "../states/app.state";
import {createSelector} from "@ngrx/store";
import {PositionState} from "../states/position.state";

const selectPosition =  (state: AppState) => state.positionState;

export const selectPositions = createSelector(
  selectPosition,
  (state: PositionState) => state.positions
);
