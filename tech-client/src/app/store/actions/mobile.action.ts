import {Action} from '@ngrx/store';
import {MeDto} from "../../api/web-console/models/me-dto";
import {MobileSignupDto} from "../../api/web-console/models/mobile-signup-dto";
import {MobileLoginDto} from "../../api/web-console/models/mobile-login-dto";

export enum MobileActionEnum {
  MOBILE_SIGNUP_REQUEST = '[MOBILE] mobile user',
  MOBILE_SIGNUP_NAVIGATE = '[MOBILE] mobile user navigate',
  MOBILE_SIGNUP_SUCCESS = '[MOBILE] mobile user success',
  MOBILE_SIGNUP_ERROR = '[MOBILE] mobile user error',
  MOBILE_LOGIN_REQUEST = '[MOBILE] mobile login',
  MOBILE_LOGIN_NAVIGATE = '[MOBILE] mobile login navigate',
  MOBILE_LOGIN_SUCCESS = '[MOBILE] mobile login success',
  MOBILE_LOGIN_ERROR = '[MOBILE] mobile login error'
}

/**
 * MOBILE Actions
 */
export class MobileSignupAction implements Action {
  readonly type = MobileActionEnum.MOBILE_SIGNUP_REQUEST;

  constructor(public payload: MobileSignupDto) {
  }
}

export class MobileSignupNavigateAction implements Action {
  readonly type = MobileActionEnum.MOBILE_SIGNUP_NAVIGATE;

  constructor(public payload: MeDto) {
  }
}

export class MobileSignupSuccessAction implements Action {
  readonly type = MobileActionEnum.MOBILE_SIGNUP_SUCCESS;

  constructor(public payload: MeDto) {
  }
}

export class MobileSignupErrorAction implements Action {
  readonly type = MobileActionEnum.MOBILE_SIGNUP_ERROR;

  constructor(public payload: any) {
  }
}

export class MobileLoginAction implements Action {
  readonly type = MobileActionEnum.MOBILE_LOGIN_REQUEST;

  constructor(public payload: MobileLoginDto) {
  }
}

export class MobileLoginNavigateAction implements Action {
  readonly type = MobileActionEnum.MOBILE_LOGIN_NAVIGATE;

  constructor(public payload: MeDto) {
  }
}

export class MobileLoginSuccessAction implements Action {
  readonly type = MobileActionEnum.MOBILE_LOGIN_SUCCESS;

  constructor(public payload: MeDto) {
  }
}

export class MobileLoginErrorAction implements Action {
  readonly type = MobileActionEnum.MOBILE_LOGIN_ERROR;

  constructor(public payload: any) {
  }
}

export type Actions = MobileSignupAction |
  MobileSignupSuccessAction |
  MobileSignupErrorAction |
  MobileSignupNavigateAction |
  MobileLoginAction |
  MobileLoginSuccessAction |
  MobileLoginErrorAction |
  MobileLoginNavigateAction;
