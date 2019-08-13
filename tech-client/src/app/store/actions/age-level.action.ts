import {Action} from '@ngrx/store';
import {AllAgeLevelsDto} from "../../api/web-console/models/all-age-levels-dto"

export enum AgeLevelActionEnum {
  AGE_LEVEL_REQUEST = '[AGE_LEVEL] age level request',
  AGE_LEVEL_SUCCESS = '[AGE_LEVEL] age level success',
  AGE_LEVEL_ERROR = '[AGE_LEVEL] age level error',
}

/**
 * MOBILE Actions
 */
export class AgeLevelRequestAction implements Action {
  readonly type = AgeLevelActionEnum.AGE_LEVEL_REQUEST;

  constructor() {
  }
}

export class AgeLevelSuccessAction implements Action {
  readonly type = AgeLevelActionEnum.AGE_LEVEL_SUCCESS;

  constructor(public payload: AllAgeLevelsDto) {
  }
}

export class AgeLevelErrorAction implements Action {
  readonly type = AgeLevelActionEnum.AGE_LEVEL_ERROR;

  constructor(public payload: any) {
  }
}

export type AgeLevelActions = AgeLevelRequestAction |
  AgeLevelSuccessAction |
  AgeLevelErrorAction;
