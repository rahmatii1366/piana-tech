import {AuthenticationActionEnum, AuthenticationActions} from '../actions/authentication.action';
import {initialMeState, MeState} from "../states/me.state";

export function AuthenticationReducers(state = initialMeState,
  action: AuthenticationActions
): MeState {
  switch (action.type) {
    case AuthenticationActionEnum.HOWME_SUCCESS: {
      return {
        ...state,
        meDto: action.payload,
        tokenRequiredDto: null
      };
    }
    case AuthenticationActionEnum.HOWME_ERROR: {
      return {
        ...state,
        meDto: null,
        tokenRequiredDto: null,
      };
    }
    case AuthenticationActionEnum.SIGNUP_SUCCESS: {
      return {
        ...state,
        tokenRequiredDto: action.payload
      };
    }
    case AuthenticationActionEnum.SIGNUP_ERROR: {
      return {
        ...state,
        meDto: null
      };
    }
    case AuthenticationActionEnum.LOGIN_SUCCESS: {

      return {
        ...state,
        meDto: action.payload,
        tokenRequiredDto: null
      };
    }
    case AuthenticationActionEnum.LOGIN_ERROR: {
      return {
        ...state,
        meDto: null,
        tokenRequiredDto: null,
      };
    }
    case AuthenticationActionEnum.FORGET_PASSWORD_SUCCESS: {
      return {
        ...state,
        tokenRequiredDto: action.payload,
        meDto: null
      };
    }
    case AuthenticationActionEnum.FORGET_PASSWORD_ERROR: {
      return {
        ...state,
        meDto: null
      };
    }
    case AuthenticationActionEnum.VERIFY_TOKEN_SUCCESS: {
      return {
        ...state,
        meDto: action.payload,
        tokenRequiredDto: null
      };
    }
    case AuthenticationActionEnum.VERIFY_TOKEN_ERROR: {
      return {
        ...state,
        meDto: null
      };
    }
    case AuthenticationActionEnum.LOGOUT_SUCCESS: {
      return {
        ...state,
        meDto: null,
        tokenRequiredDto: null
      };
    }
    case AuthenticationActionEnum.LOGOUT_ERROR: {
      return {
        ...state,
      };
    }
    default:
      return state
  }
}
