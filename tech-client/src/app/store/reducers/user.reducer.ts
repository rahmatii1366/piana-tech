import * as user from '../actions/user.action';
import {EUserAction, UserActions} from '../actions/user.action';
import {RoleEnum} from '../../api/web-console/models/role-enum';
import {initialUserState, IUserState} from "../states/user.state";

export const UserReducers = (
  state = initialUserState,
  action: UserActions
): IUserState => {
  switch (action.type) {
    case EUserAction.SIGNUP_REQUEST: {
      return {
        ...state,
        meDto: action.payload
      }
    }
    default:
      return state
  }
}
