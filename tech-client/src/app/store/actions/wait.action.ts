import {Action} from '@ngrx/store';
import {Actions} from "@ngrx/effects";

export enum WaitActionEnum {
  WAIT_REQUEST = '[WAIT] wait request',
  WAIT_EXIT = '[WAIT] wait exit'
}

/**
 * MOBILE Actions
 */
export class WaitRequestAction implements Action {
  readonly type = WaitActionEnum.WAIT_REQUEST;

  constructor() {
  }
}

export class WaitExitAction implements Action {
  readonly type = WaitActionEnum.WAIT_EXIT;

  constructor() {
  }
}

export type WaitActions = WaitRequestAction |
  WaitExitAction;
