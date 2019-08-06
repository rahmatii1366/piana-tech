import {Action} from '@ngrx/store';
import {MeDto} from "../../api/web-console/models/me-dto";
import {LoginDto} from "../../api/web-console/models/login-dto";

export enum LoginActionEnum {
  LOGIN_REQUEST = '[LOGIN] login user',
  LOGIN_REQUEST_NAVIGATE = '[LOGIN] login user navigate',
  LOGIN_REQUEST_SUCCESS = '[LOGIN] login user success',
  LOGIN_REQUEST_ERROR = '[LOGIN] login user error'
}

/**
 * SIGN-UP Actions
 */
export class LoginAction implements Action {
  readonly type = LoginActionEnum.LOGIN_REQUEST;

  constructor(public payload: LoginDto) {
  }
}

export class LoginNavigateAction implements Action {
  readonly type = LoginActionEnum.LOGIN_REQUEST_NAVIGATE;

  constructor(public payload: MeDto) {
  }
}

export class LoginSuccessAction implements Action {
  readonly type = LoginActionEnum.LOGIN_REQUEST_SUCCESS;

  constructor(public payload: MeDto) {
  }
}

export class LoginErrorAction implements Action {
  readonly type = LoginActionEnum.LOGIN_REQUEST_ERROR;

  constructor(public payload: any) {
  }
}

export type Actions = LoginAction |
  LoginSuccessAction |
  LoginErrorAction |
  LoginErrorAction;
