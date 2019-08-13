import {Action} from '@ngrx/store';
import {MeDto} from "../../api/web-console/models/me-dto";
import {SignupDto} from "../../api/web-console/models/signup-dto";
import {LoginDto} from "../../api/web-console/models/login-dto";
import {ForgetPasswordDto} from "../../api/web-console/models/forget-password-dto";
import {VerifyTokenDto} from "../../api/web-console/models/verify-token-dto";
import {TokenRequiredDto} from "../../api/web-console/models/token-required-dto";
// import {MobileSignupDto} from "../../api/web-console/models/mobile-signup-dto";
// import {MobileLoginDto} from "../../api/web-console/models/mobile-login-dto";

export enum AuthenticationActionEnum {
  SIGNUP_REQUEST = '[AUTHENTICATION] signup request',
  SIGNUP_NAVIGATE = '[AUTHENTICATION] signup navigate',
  SIGNUP_SUCCESS = '[AUTHENTICATION] signup success',
  SIGNUP_ERROR = '[AUTHENTICATION] signup error',
  LOGIN_REQUEST = '[AUTHENTICATION] login request',
  LOGIN_NAVIGATE = '[AUTHENTICATION] login navigate',
  LOGIN_SUCCESS = '[AUTHENTICATION] login success',
  LOGIN_ERROR = '[AUTHENTICATION] login error',
  FORGET_PASSWORD_REQUEST = '[AUTHENTICATION] forget password request',
  FORGET_PASSWORD_NAVIGATE = '[AUTHENTICATION] forget password navigate',
  FORGET_PASSWORD_SUCCESS = '[AUTHENTICATION] forget password success',
  FORGET_PASSWORD_ERROR = '[AUTHENTICATION] forget password error',
  VERIFY_TOKEN_REQUEST = '[AUTHENTICATION] token verify request',
  VERIFY_TOKEN_NAVIGATE = '[AUTHENTICATION] token verify navigate',
  VERIFY_TOKEN_SUCCESS = '[AUTHENTICATION] token verify success',
  VERIFY_TOKEN_ERROR = '[AUTHENTICATION] token verify error',
  LOGOUT_REQUEST = '[AUTHENTICATION] logout request',
  LOGOUT_NAVIGATE = '[AUTHENTICATION] logout navigate',
  LOGOUT_SUCCESS = '[AUTHENTICATION] logout success',
  LOGOUT_ERROR = '[AUTHENTICATION] logout error'
}

/**
 * MOBILE Actions
 */
export class SignupRequestAction implements Action {
  readonly type = AuthenticationActionEnum.SIGNUP_REQUEST;

  constructor(public payload: SignupDto) {
  }
}

export class SignupNavigateAction implements Action {
  readonly type = AuthenticationActionEnum.SIGNUP_NAVIGATE;

  constructor(public payload: TokenRequiredDto) {
  }
}

export class SignupSuccessAction implements Action {
  readonly type = AuthenticationActionEnum.SIGNUP_SUCCESS;

  constructor(public payload: TokenRequiredDto) {
  }
}

export class SignupErrorAction implements Action {
  readonly type = AuthenticationActionEnum.SIGNUP_ERROR;

  constructor(public payload: any) {
  }
}

export class LoginRequestAction implements Action {
  readonly type = AuthenticationActionEnum.LOGIN_REQUEST;

  constructor(public payload: LoginDto) {
  }
}

export class LoginNavigateAction implements Action {
  readonly type = AuthenticationActionEnum.LOGIN_NAVIGATE;

  constructor(public payload: MeDto) {
  }
}

export class LoginSuccessAction implements Action {
  readonly type = AuthenticationActionEnum.LOGIN_SUCCESS;

  constructor(public payload: MeDto) {
  }
}

export class LoginErrorAction implements Action {
  readonly type = AuthenticationActionEnum.LOGIN_ERROR;

  constructor(public payload: any) {
  }
}

export class ForgetPasswordRequestAction implements Action {
  readonly type = AuthenticationActionEnum.FORGET_PASSWORD_REQUEST;

  constructor(public payload: ForgetPasswordDto) {
  }
}

export class ForgetPasswordNavigateAction implements Action {
  readonly type = AuthenticationActionEnum.FORGET_PASSWORD_NAVIGATE;

  constructor(public payload: TokenRequiredDto) {
  }
}

export class ForgetPasswordSuccessAction implements Action {
  readonly type = AuthenticationActionEnum.FORGET_PASSWORD_SUCCESS;

  constructor(public payload: TokenRequiredDto) {
  }
}

export class ForgetPasswordErrorAction implements Action {
  readonly type = AuthenticationActionEnum.FORGET_PASSWORD_ERROR;

  constructor(public payload: any) {
  }
}

export class VerifyTokenRequestAction implements Action {
  readonly type = AuthenticationActionEnum.VERIFY_TOKEN_REQUEST;

  constructor(public payload: VerifyTokenDto) {
  }
}

export class VerifyTokenNavigateAction implements Action {
  readonly type = AuthenticationActionEnum.VERIFY_TOKEN_NAVIGATE;

  constructor(public payload: MeDto) {
  }
}

export class VerifyTokenSuccessAction implements Action {
  readonly type = AuthenticationActionEnum.VERIFY_TOKEN_SUCCESS;

  constructor(public payload: MeDto) {
  }
}

export class VerifyTokenErrorAction implements Action {
  readonly type = AuthenticationActionEnum.VERIFY_TOKEN_ERROR;

  constructor(public payload: any) {
  }
}

export class LogoutRequestAction implements Action {
  readonly type = AuthenticationActionEnum.LOGOUT_REQUEST;

  constructor() {
  }
}

export class LogoutNavigateAction implements Action {
  readonly type = AuthenticationActionEnum.LOGOUT_NAVIGATE;

  constructor() {
  }
}

export class LogoutSuccessAction implements Action {
  readonly type = AuthenticationActionEnum.LOGOUT_SUCCESS;

  constructor() {
  }
}

export class LogoutErrorAction implements Action {
  readonly type = AuthenticationActionEnum.LOGOUT_ERROR;

  constructor(public payload: any) {
  }
}

export type AuthenticationActions = SignupRequestAction |
  SignupSuccessAction |
  SignupErrorAction |
  SignupNavigateAction |
  LoginRequestAction |
  LoginSuccessAction |
  LoginErrorAction |
  LoginNavigateAction |
  ForgetPasswordRequestAction |
  ForgetPasswordSuccessAction |
  ForgetPasswordErrorAction |
  ForgetPasswordNavigateAction |
  VerifyTokenRequestAction |
  VerifyTokenSuccessAction |
  VerifyTokenErrorAction |
  VerifyTokenNavigateAction |
  LogoutRequestAction |
  LogoutNavigateAction |
  LogoutSuccessAction |
  LogoutErrorAction;
