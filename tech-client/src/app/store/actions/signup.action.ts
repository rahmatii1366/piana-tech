import {Action} from '@ngrx/store';
import {MeDto} from "../../api/web-console/models/me-dto";
import {SignupDto} from "../../api/web-console/models/signup-dto";
import {VerifyCodeDto} from "../../api/web-console/models/verify-code-dto";

export enum ESignupAction {
  SIGNUP_REQUEST = '[SIGN-UP] sign up user',
  SIGNUP_REQUEST_NAVIGATE = '[SIGN-UP] sign up user navigate',
  SIGNUP_REQUEST_SUCCESS = '[SIGN-UP] sign up user success',
  SIGNUP_REQUEST_ERROR = '[SIGN-UP] sign up user error',
  SIGNUP_EMAIL_VERIFY_REQUEST = '[SIGN-UP] email verify',
  SIGNUP_EMAIL_VERIFY_NAVIGATE = '[SIGN-UP] email verify navigate',
  SIGNUP_EMAIL_VERIFY_SUCCESS = '[SIGN-UP] email verify success',
  SIGNUP_EMAIL_VERIFY_ERROR = '[SIGN-UP] email verify error'
}

/**
 * SIGN-UP Actions
 */
export class SignupActions implements Action {
  readonly type = ESignupAction.SIGNUP_REQUEST;

  constructor(public payload: SignupDto) {
  }
}

export class SignupNavigateActions implements Action {
  readonly type = ESignupAction.SIGNUP_REQUEST_NAVIGATE;

  constructor(public payload: MeDto) {
  }
}

export class SignupSuccessActions implements Action {
  readonly type = ESignupAction.SIGNUP_REQUEST_SUCCESS;

  constructor(public payload: MeDto) {
  }
}

export class SignupErrorActions implements Action {
  readonly type = ESignupAction.SIGNUP_REQUEST_ERROR;

  constructor(public payload: any) {
  }
}

export class SignupEmailVerifyActions implements Action {
  readonly type = ESignupAction.SIGNUP_EMAIL_VERIFY_REQUEST;

  constructor(public payload: VerifyCodeDto) {
  }
}

export class SignupEmailVerifyNavigateActions implements Action {
  readonly type = ESignupAction.SIGNUP_EMAIL_VERIFY_NAVIGATE;

  constructor(public payload: MeDto) {
  }
}

export class SignupEmailVerifySuccessActions implements Action {
  readonly type = ESignupAction.SIGNUP_EMAIL_VERIFY_SUCCESS;

  constructor(public payload: MeDto) {
  }
}

export class SignupEmailVerifyErrorActions implements Action {
  readonly type = ESignupAction.SIGNUP_EMAIL_VERIFY_ERROR;

  constructor(public payload: any) {
  }
}

export type Actions = SignupActions |
  SignupSuccessActions |
  SignupErrorActions |
  SignupErrorActions |
  SignupEmailVerifyActions |
  SignupEmailVerifyNavigateActions |
  SignupEmailVerifySuccessActions |
  SignupEmailVerifyErrorActions;
