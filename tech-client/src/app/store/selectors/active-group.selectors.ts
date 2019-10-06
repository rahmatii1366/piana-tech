import {AppState} from "../states/app.state";
import {createSelector} from "@ngrx/store";
import {ActiveGroupState} from "../states/active-group.state";

const selectActiveGroup =  (state: AppState) => state.activeGroup;

export const selectActiveGroupState = createSelector(
  selectActiveGroup,
  (state: ActiveGroupState) => state.groupName
);
