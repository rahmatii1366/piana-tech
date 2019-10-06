import {Action} from '@ngrx/store';
import {UserInfoDto} from "../../api/web-console/models/user-info-dto";
import {PlayerPositionDto} from "../../api/web-console/models/player-position-dto";
import {PlayerInfoDto} from "../../api/web-console/models/player-info-dto";

export enum PlayerActionEnum {
  PLAYER_GET_INFO_REQUEST = '[Player] get request',
  PLAYER_GET_INFO_SUCCESS = '[player] get success',
  PLAYER_GET_INFO_ERROR = '[player] get error',
  PLAYER_UPDATE_INFO_REQUEST = '[Player] update info request',
  PLAYER_UPDATE_INFO_SUCCESS = '[player] update info success',
  PLAYER_UPDATE_INFO_ERROR = '[player] update info error',
  PLAYER_GET_POSITION_REQUEST = '[Player] get position request',
  PLAYER_GET_POSITION_SUCCESS = '[player] get position success',
  PLAYER_GET_POSITION_ERROR = '[player] get position error',
  PLAYER_UPDATE_POSITION_REQUEST = '[Player] update position request',
  PLAYER_UPDATE_POSITION_SUCCESS = '[player] update position success',
  PLAYER_UPDATE_POSITION_ERROR = '[player] update position error',
}

/**
 * MOBILE Actions
 */
export class PlayerGetInfoRequestAction implements Action {
  readonly type = PlayerActionEnum.PLAYER_GET_INFO_REQUEST;

  constructor() {
  }
}

export class PlayerGetInfoSuccessAction implements Action {
  readonly type = PlayerActionEnum.PLAYER_GET_INFO_SUCCESS;

  constructor(public payload: PlayerInfoDto) {
  }
}

export class PlayerGetInfoErrorAction implements Action {
  readonly type = PlayerActionEnum.PLAYER_GET_INFO_ERROR;

  constructor(public payload: any) {
  }
}

export class PlayerUpdateInfoRequestAction implements Action {
  readonly type = PlayerActionEnum.PLAYER_UPDATE_INFO_REQUEST;

  constructor(public payload: PlayerInfoDto) {
  }
}

export class PlayerUpdateInfoSuccessAction implements Action {
  readonly type = PlayerActionEnum.PLAYER_UPDATE_INFO_SUCCESS;

  constructor(public payload: PlayerInfoDto) {
  }
}

export class PlayerUpdateInfoErrorAction implements Action {
  readonly type = PlayerActionEnum.PLAYER_UPDATE_INFO_ERROR;

  constructor(public payload: any) {
  }
}

export class PlayerGetPositionRequestAction implements Action {
  readonly type = PlayerActionEnum.PLAYER_GET_POSITION_REQUEST;

  constructor() {
  }
}

export class PlayerGetPositionSuccessAction implements Action {
  readonly type = PlayerActionEnum.PLAYER_GET_POSITION_SUCCESS;

  constructor(public payload: PlayerPositionDto) {
  }
}

export class PlayerGetPositionErrorAction implements Action {
  readonly type = PlayerActionEnum.PLAYER_GET_POSITION_ERROR;

  constructor(public payload: any) {
  }
}

export class PlayerUpdatePositionRequestAction implements Action {
  readonly type = PlayerActionEnum.PLAYER_UPDATE_POSITION_REQUEST;

  constructor(public payload: PlayerPositionDto) {
  }
}

export class PlayerUpdatePositionSuccessAction implements Action {
  readonly type = PlayerActionEnum.PLAYER_UPDATE_POSITION_SUCCESS;

  constructor(public payload: PlayerPositionDto) {
  }
}

export class PlayerUpdatePositionErrorAction implements Action {
  readonly type = PlayerActionEnum.PLAYER_UPDATE_POSITION_ERROR;

  constructor(public payload: any) {
  }
}

export type PlayerActions = PlayerGetInfoRequestAction |
  PlayerGetInfoSuccessAction |
  PlayerGetInfoErrorAction |
  PlayerUpdateInfoRequestAction |
  PlayerUpdateInfoSuccessAction |
  PlayerUpdateInfoErrorAction |
  PlayerGetPositionRequestAction |
  PlayerGetPositionSuccessAction |
  PlayerGetPositionErrorAction |
  PlayerUpdatePositionRequestAction |
  PlayerUpdatePositionSuccessAction |
  PlayerUpdatePositionErrorAction;
