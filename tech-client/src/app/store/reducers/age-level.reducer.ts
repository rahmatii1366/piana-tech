import {AgeLevelState, initialAgeLevelState} from "../states/age-level.state";
import {AgeLevelActionEnum, AgeLevelActions} from "../actions/age-level.action";

export function AgeLevelReducers(state = initialAgeLevelState,
  action: AgeLevelActions
): AgeLevelState {
  switch (action.type) {
    case AgeLevelActionEnum.AGE_LEVEL_SUCCESS: {
      return {
        ...state,
        ageLevels: action.payload
      };
    }
    case AgeLevelActionEnum.AGE_LEVEL_ERROR: {
      return {
        ...state
      };
    }
    default:
      return state
  }
}
