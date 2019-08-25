import {AppState} from "../states/app.state";
import {createSelector} from "@ngrx/store";
import {InviteState} from "../states/invite.state";

const selectInviterList =  (state: AppState) => state.inviteState;

export const selectInviterListState = createSelector(
  selectInviterList,
  (state: InviteState) => state.inviterList
);
