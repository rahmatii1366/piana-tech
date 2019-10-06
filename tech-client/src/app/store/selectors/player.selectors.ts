import {AppState} from "../states/app.state";
import {createSelector} from "@ngrx/store";
import {MeState} from "../states/me.state";
import {PlayerState} from "../states/player.state";

const selectPlayerState =  (state: AppState) => state.playerState;

export const selectPlayerInfoDto = createSelector(
  selectPlayerState,
  (state: PlayerState) => state.playerInfoDto
);

export const selectPlayerPositionDto = createSelector(
  selectPlayerState,
  (state: PlayerState) => state.playerPositionDto
);

export const selectPlayerLocationDto = createSelector(
  selectPlayerState,
  (state: PlayerState) => state.playerLocationDto
);

export const selectUserInfoDto = createSelector(
  selectPlayerState,
  (state: PlayerState) => state.userInfoDto
);
