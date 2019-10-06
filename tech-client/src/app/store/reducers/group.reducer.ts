import {GroupState, initialGroupState} from "../states/group.state";
import {GroupActionEnum, GroupActions} from "../actions/group.action";

export function GroupReducers(state = initialGroupState,
  action: GroupActions
): GroupState {
  switch (action.type) {
    case GroupActionEnum.GROUP_CREATE_SUCCESS: {
      state.groupMap[action.payload.name] = action.payload;
      return {
        ...state,
        groups: state.groups.concat(action.payload),
        groupMap: state.groupMap
      };
    }
    case GroupActionEnum.GROUP_CREATE_ERROR: {
      return {
        ...state,
        groups: null
      };
    }
    case GroupActionEnum.GROUP_UPDATE_SUCCESS: {
      state.groupMap[action.payload.name] = action.payload;
      return {
        ...state,
        groups: state.groups.concat(action.payload),
        groupMap: state.groupMap
      };
    }
    case GroupActionEnum.GROUP_UPDATE_ERROR: {
      return {
        ...state,
        groups: null
      };
    }
    case GroupActionEnum.GROUP_GET_SUCCESS: {
      console.log("GROUP_GET_SUCCESS");
      console.log(action.payload);
      state.groupMap = {};
      action.payload.forEach(groupDto => {
        state.groupMap[groupDto.name] = groupDto;
      });

      return {
        ...state,
        groups: action.payload,
        groupMap: state.groupMap
      };
    }
    case GroupActionEnum.GROUP_GET_ERROR: {
      return {
        ...state,
        groups: null,
        groupMap: {}
      };
    }
    default:
      return state
  }
}
