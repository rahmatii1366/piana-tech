import {GroupState, initialGroupState} from "../states/group.state";
import {GroupActionEnum, GroupActions} from "../actions/group.action";

export function GroupReducers(state = initialGroupState,
  action: GroupActions
): GroupState {
  switch (action.type) {
    case GroupActionEnum.GROUP_CREATE_SUCCESS: {
      return {
        ...state,
        group: action.payload
      };
    }
    case GroupActionEnum.GROUP_CREATE_ERROR: {
      return {
        ...state,
        group: null
      };
    }
    case GroupActionEnum.GROUP_GET_SUCCESS: {
      console.log("GROUP_GET_SUCCESS");
      console.log(action.payload);

      return {
        ...state,
        group: action.payload
      };
    }
    case GroupActionEnum.GROUP_GET_ERROR: {
      return {
        ...state,
        group: null
      };
    }
    default:
      return state
  }
}
