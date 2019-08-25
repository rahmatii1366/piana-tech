import {initialInviteState, InviteState} from "../states/invite.state";
import {InviteActionEnum, InviteActions} from "../actions/invite.action";

export function InviteReducers(state = initialInviteState,
  action: InviteActions
): InviteState {
  switch (action.type) {
    case InviteActionEnum.INVITERS_SUCCESS: {
      return {
        ...state,
        inviterList: action.payload
      };
    }
    case InviteActionEnum.INVITERS_ERROR: {
      return {
        ...state,
        inviterList: null
      };
    }
    case InviteActionEnum.INVITE_ACCEPT_SUCCESS: {
      const index = state.inviterList.inviters.indexOf(action.payload, 0);
      if (index > -1) {
        state.inviterList.inviters.splice(index, 1);
      }
      return {
        ...state,
        inviterList: state.inviterList
      };
    }
    case InviteActionEnum.INVITE_ACCEPT_ERROR: {
      return {
        ...state,
        inviterList: state.inviterList
      };
    }
    default:
      return state
  }
}
