import {ESignupAction, Actions} from '../actions/signup.action';
import {initialMeState, MeState} from "../states/meState";

export function SignupReducers(state = initialMeState,
  action: Actions
): MeState {
  switch (action.type) {
    case ESignupAction.SIGNUP_REQUEST_SUCCESS: {
      return {
        ...state,
        meDto: action.payload
      };
    }
    case ESignupAction.SIGNUP_REQUEST_ERROR: {
      return {
        ...state,
        meDto: null
      };
    }
    case ESignupAction.SIGNUP_EMAIL_VERIFY_SUCCESS: {
      return {
        ...state,
        meDto: action.payload
      };
    }
    case ESignupAction.SIGNUP_EMAIL_VERIFY_ERROR: {
      return {
        ...state,
        meDto: null
      };
    }
    default:
      return state
  }
}
