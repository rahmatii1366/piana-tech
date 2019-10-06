import {initialPositionState, PositionState} from "../states/position.state";
import {PositionActionEnum, PositionActions} from "../actions/position.action";

export function PositionReducers(state = initialPositionState,
  action: PositionActions
): PositionState {
  switch (action.type) {
    case PositionActionEnum.POSITION_SUCCESS: {
      return {
        ...state,
        positions: action.payload
      };
    }
    case PositionActionEnum.POSITION_ERROR: {
      return {
        ...state
      };
    }
    default:
      return state
  }
}
