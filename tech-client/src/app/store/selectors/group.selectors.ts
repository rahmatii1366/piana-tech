import {AppState} from "../states/app.state";
import {createSelector} from "@ngrx/store";
import {GroupState} from "../states/group.state";

const selectGroup =  (state: AppState) => state.groupState;
const selectGroupMap =  (state: AppState) => state.groupState;

export const selectGroupState = createSelector(
  selectGroup,
  (state: GroupState) => state.groups
);

export const selectGroupMapState = createSelector(
  selectGroupMap,
  (state: GroupState) => state.groupMap
);
