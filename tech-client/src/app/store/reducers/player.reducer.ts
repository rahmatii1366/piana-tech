import {initialPlayerState, PlayerState} from "../states/player.state";
import {PlayerActionEnum, PlayerActions} from "../actions/player.action";

export function PlayerReducers(state = initialPlayerState,
  action: PlayerActions
): PlayerState {
  switch (action.type) {
    case PlayerActionEnum.PLAYER_GET_INFO_SUCCESS: {
      console.log("Player GET SUCCESS");
      console.log(action.payload);
      return {
        ...state,
        playerInfoDto: action.payload
      };
    }
    case PlayerActionEnum.PLAYER_GET_INFO_ERROR: {
      return {
        ...state,
        userInfoDto: null
      };
    }
    case PlayerActionEnum.PLAYER_UPDATE_INFO_SUCCESS: {
      console.log("Player update position SUCCESS");
      return {
        ...state,
        playerInfoDto: action.payload
      };
    }
    case PlayerActionEnum.PLAYER_UPDATE_INFO_ERROR: {
      return {
        ...state
      };
    }
    case PlayerActionEnum.PLAYER_GET_POSITION_SUCCESS: {
      console.log("Player GET position SUCCESS");
      console.log(action.payload);
      return {
        ...state,
        playerPositionDto: action.payload
      };
    }
    case PlayerActionEnum.PLAYER_GET_POSITION_ERROR: {
      return {
        ...state,
        playerPositionDto: null
      };
    }
    case PlayerActionEnum.PLAYER_UPDATE_POSITION_SUCCESS: {
      console.log("Player update position SUCCESS");
      return {
        ...state,
        playerPositionDto: action.payload
      };
    }
    case PlayerActionEnum.PLAYER_UPDATE_POSITION_ERROR: {
      return {
        ...state
      };
    }
    default:
      return state
  }
}
