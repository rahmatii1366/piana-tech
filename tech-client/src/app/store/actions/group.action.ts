import {Action} from '@ngrx/store';
import {GroupDto} from "../../api/web-console/models/group-dto";
import {UpdateGroupDto} from "../../api/web-console/models/update-group-dto";

export enum GroupActionEnum {
  GROUP_CREATE_REQUEST = '[GROUP] create request',
  GROUP_CREATE_NAVIGATE = '[GROUP] create navigate',
  GROUP_CREATE_SUCCESS = '[GROUP] create success',
  GROUP_CREATE_ERROR = '[GROUP] create error',
  GROUP_UPDATE_REQUEST = '[GROUP] update request',
  GROUP_UPDATE_NAVIGATE = '[GROUP] update navigate',
  GROUP_UPDATE_SUCCESS = '[GROUP] update success',
  GROUP_UPDATE_ERROR = '[GROUP] update error',
  GROUP_GET_REQUEST = '[GROUP] get request',
  GROUP_GET_SUCCESS = '[GROUP] get success',
  GROUP_GET_ERROR = '[GROUP] get error',
}

/**
 * MOBILE Actions
 */
export class GroupCreateRequestAction implements Action {
  readonly type = GroupActionEnum.GROUP_CREATE_REQUEST;

  constructor(public payload: GroupDto) {
  }
}

export class GroupCreateNavigateAction implements Action {
  readonly type = GroupActionEnum.GROUP_CREATE_NAVIGATE;

  constructor(public payload: GroupDto) {
  }
}

export class GroupCreateSuccessAction implements Action {
  readonly type = GroupActionEnum.GROUP_CREATE_SUCCESS;

  constructor(public payload: GroupDto) {
  }
}

export class GroupCreateErrorAction implements Action {
  readonly type = GroupActionEnum.GROUP_CREATE_ERROR;

  constructor(public payload: any) {
  }
}

export class GroupUpdateRequestAction implements Action {
  readonly type = GroupActionEnum.GROUP_UPDATE_REQUEST;

  constructor(public payload: UpdateGroupDto) {
  }
}

export class GroupUpdateNavigateAction implements Action {
  readonly type = GroupActionEnum.GROUP_UPDATE_NAVIGATE;

  constructor(public payload: GroupDto) {
  }
}

export class GroupUpdateSuccessAction implements Action {
  readonly type = GroupActionEnum.GROUP_UPDATE_SUCCESS;

  constructor(public payload: GroupDto) {
  }
}

export class GroupUpdateErrorAction implements Action {
  readonly type = GroupActionEnum.GROUP_UPDATE_ERROR;

  constructor(public payload: any) {
  }
}

export class GroupGetRequestAction implements Action {
  readonly type = GroupActionEnum.GROUP_GET_REQUEST;

  constructor() {
  }
}

export class GroupGetSuccessAction implements Action {
  readonly type = GroupActionEnum.GROUP_GET_SUCCESS;

  constructor(public payload: GroupDto[]) {
  }
}

export class GroupGetErrorAction implements Action {
  readonly type = GroupActionEnum.GROUP_GET_ERROR;

  constructor(public payload: any) {
  }
}

export type GroupActions = GroupCreateRequestAction |
  GroupCreateNavigateAction |
  GroupCreateSuccessAction |
  GroupCreateErrorAction |
  GroupUpdateRequestAction |
  GroupUpdateNavigateAction |
  GroupUpdateSuccessAction |
  GroupUpdateErrorAction |
  GroupGetRequestAction |
  GroupGetSuccessAction |
  GroupGetErrorAction;
