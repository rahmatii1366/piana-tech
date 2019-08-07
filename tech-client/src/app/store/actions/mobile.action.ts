import {Action} from '@ngrx/store';
import {MeDto} from "../../api/web-console/models/me-dto";
import {LoginDto} from "../../api/web-console/models/login-dto";
import {MobileSignupDto} from "../../api/web-console/models/mobile-signup-dto";

export enum MobileActionEnum {
  MOBILE_REQUEST = '[MOBILE] mobile user',
  MOBILE_REQUEST_NAVIGATE = '[MOBILE] mobile user navigate',
  MOBILE_REQUEST_SUCCESS = '[MOBILE] mobile user success',
  MOBILE_REQUEST_ERROR = '[MOBILE] mobile user error',
  MOBILE_REQUEST_WAIT = '[MOBILE] mobile user wait'
}

/**
 * MOBILE Actions
 */
export class MobileAction implements Action {
  readonly type = MobileActionEnum.MOBILE_REQUEST;

  constructor(public payload: MobileSignupDto) {
  }
}

export class MobileNavigateAction implements Action {
  readonly type = MobileActionEnum.MOBILE_REQUEST_NAVIGATE;

  constructor(public payload: MeDto) {
  }
}

export class MobileSuccessAction implements Action {
  readonly type = MobileActionEnum.MOBILE_REQUEST_SUCCESS;

  constructor(public payload: MeDto) {
  }
}

export class MobileErrorAction implements Action {
  readonly type = MobileActionEnum.MOBILE_REQUEST_ERROR;

  constructor(public payload: any) {
  }
}

export class MobileWaitAction implements Action {
  readonly type = MobileActionEnum.MOBILE_REQUEST_WAIT;

  constructor(public payload: MobileSignupDto) {
  }
}

export type Actions = MobileAction |
  MobileSuccessAction |
  MobileErrorAction |
  MobileNavigateAction |
  MobileWaitAction;
