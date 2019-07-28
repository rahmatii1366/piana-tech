import {Action} from '@ngrx/store';
import {MeDto} from "../../api/web-console/models/me-dto";

export enum EUserAction {
  SIGNUP_REQUEST = '[USER] sign up user'
}

/**
 * forgot UID Actions
 */
export class UserActions implements Action {
  readonly type = EUserAction.SIGNUP_REQUEST;

  constructor(public payload: MeDto) {
  }
}


export type Actions
  = EUserAction.SIGNUP_REQUEST;
