import {Action} from '@ngrx/store';
import {GroupDto} from "../../api/web-console/models/group-dto";
import {InviterListDto} from "../../api/web-console/models/inviter-list-dto";
import {InviterDto} from "../../api/web-console/models/inviter-dto";

export enum InviteActionEnum {
  INVITERS_REQUEST = '[INVITE] get inviters request',
  INVITERS_SUCCESS = '[INVITE] get inviters success',
  INVITERS_ERROR = '[INVITE] get inviters error',
  INVITE_ACCEPT_REQUEST = '[INVITE] accept request',
  INVITE_ACCEPT_SUCCESS = '[INVITE] accept success',
  INVITE_ACCEPT_ERROR = '[INVITE] accept error'
}

/**
 * MOBILE Actions
 */
export class InvitersRequestAction implements Action {
  readonly type = InviteActionEnum.INVITERS_REQUEST;

  constructor() {
  }
}

export class InvitersSuccessAction implements Action {
  readonly type = InviteActionEnum.INVITERS_SUCCESS;

  constructor(public payload: InviterListDto) {
  }
}

export class InvitersErrorAction implements Action {
  readonly type = InviteActionEnum.INVITERS_ERROR;

  constructor(public payload: any) {
  }
}

export class InviteAcceptRequestAction implements Action {
  readonly type = InviteActionEnum.INVITE_ACCEPT_REQUEST;

  constructor(public payload: InviterDto) {
  }
}

export class InviteAcceptSuccessAction implements Action {
  readonly type = InviteActionEnum.INVITE_ACCEPT_SUCCESS;

  constructor(public payload: InviterDto) {
  }
}

export class InviteAcceptErrorAction implements Action {
  readonly type = InviteActionEnum.INVITE_ACCEPT_ERROR;

  constructor(public payload: any) {
  }
}

export type InviteActions = InvitersRequestAction |
  InvitersSuccessAction |
  InvitersErrorAction |
  InviteAcceptRequestAction |
  InviteAcceptSuccessAction |
  InviteAcceptErrorAction;
