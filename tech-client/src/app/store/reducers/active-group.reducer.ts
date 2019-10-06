import {ActiveGroupActionEnum, ActiveGroupActions} from "../actions/active-group.action";
import {ActiveGroupState} from "../states/active-group.state";

export function ActiveGroupReducers(state = null,
  action: ActiveGroupActions
): ActiveGroupState {
  switch (action.type) {
    case ActiveGroupActionEnum.SET_ACTIVE_GROUP_REQUEST: {
      return {
        ...state,
        groupName: action.payload
      };
    }
    default:
      return state
  }
}
