import {MobileActionEnum, Actions} from '../actions/mobile.action';
import {initialMeState, MeState} from "../states/meState";

export function MobileReducers(state = initialMeState,
  action: Actions
): MeState {
  switch (action.type) {
    case MobileActionEnum.MOBILE_SIGNUP_SUCCESS: {
      return {
        ...state,
        meDto: action.payload
      };
    }
    case MobileActionEnum.MOBILE_SIGNUP_ERROR: {
      return {
        ...state,
        meDto: null
      };
    }
    case MobileActionEnum.MOBILE_LOGIN_SUCCESS: {
      return {
        ...state,
        meDto: action.payload
      };
    }
    case MobileActionEnum.MOBILE_LOGIN_ERROR: {
      return {
        ...state,
        meDto: null
      };
    }
    default:
      return state
  }
}
