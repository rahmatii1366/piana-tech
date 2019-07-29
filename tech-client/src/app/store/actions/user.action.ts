import {Action} from '@ngrx/store';
import {MeDto} from "../../api/web-console/models/me-dto";
import {SignupDto} from "../../api/web-console/models/signup-dto";

export enum EUserAction {
  SIGNUP_REQUEST = '[USER] sign up user',
  SIGNUP_REQUEST_NAVIGATE = '[USER] sign up user navigate',
  SIGNUP_REQUEST_SUCCESS = '[USER] sign up user success',
  SIGNUP_REQUEST_ERROR = '[USER] sign up user error'
}

/**
 * forgot UID Actions
 */
export class SignupActions implements Action {
  readonly type = EUserAction.SIGNUP_REQUEST;

  constructor(public payload: SignupDto) {
  }
}

export class SignupNavigateActions implements Action {
  readonly type = EUserAction.SIGNUP_REQUEST_NAVIGATE;

  constructor(public payload: MeDto) {
  }
}

/**
 * forgot UID Actions
 */
export class SignupSuccessActions implements Action {
  readonly type = EUserAction.SIGNUP_REQUEST_SUCCESS;

  constructor(public payload: MeDto) {
  }
}

export class SignupErrorActions implements Action {
  readonly type = EUserAction.SIGNUP_REQUEST_ERROR;

  constructor(public payload: any) {
  }
}

export type Actions = SignupActions |
  SignupSuccessActions |
  SignupErrorActions |
  SignupErrorActions;
