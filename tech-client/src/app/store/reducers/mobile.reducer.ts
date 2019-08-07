import {MobileActionEnum, Actions} from '../actions/mobile.action';
import {initialMeState, MeState} from "../states/meState";

export function MobileReducers(state = initialMeState,
  action: Actions
): MeState {
  switch (action.type) {
    case MobileActionEnum.MOBILE_REQUEST_SUCCESS: {
      return {
        ...state,
        meDto: action.payload
      };
    }
    case MobileActionEnum.MOBILE_REQUEST_ERROR: {
      return {
        ...state,
        meDto: null
      };
    }
    default:
      return state
  }
}
