import {EUserAction, Actions} from '../actions/user.action';
import {initialUserState, UserState} from "../states/userState";

export const UserReducers = (
  state = initialUserState,
  action: Actions
): UserState => {
  switch (action.type) {
    case EUserAction.SIGNUP_REQUEST_SUCCESS: {
      return {
        ...state,
        meDto: action.payload
      };
    }
    case EUserAction.SIGNUP_REQUEST_ERROR: {
      return {
        ...state,
        meDto: null
      };
    }
    default:
      return state
  }
}
