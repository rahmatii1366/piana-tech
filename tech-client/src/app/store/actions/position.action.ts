import {Action} from '@ngrx/store';
import {TitleValueListDto} from "../../api/web-console/models/title-value-list-dto";

export enum PositionActionEnum {
  POSITION_REQUEST = '[Position] Position request',
  POSITION_SUCCESS = '[Position] Position success',
  POSITION_ERROR = '[Position] Position error',
}

/**
 * MOBILE Actions
 */
export class PositionRequestAction implements Action {
  readonly type = PositionActionEnum.POSITION_REQUEST;

  constructor() {
  }
}

export class PositionSuccessAction implements Action {
  readonly type = PositionActionEnum.POSITION_SUCCESS;

  constructor(public payload: TitleValueListDto) {
  }
}

export class PositionErrorAction implements Action {
  readonly type = PositionActionEnum.POSITION_ERROR;

  constructor(public payload: any) {
  }
}

export type PositionActions = PositionRequestAction |
  PositionSuccessAction |
  PositionErrorAction;
