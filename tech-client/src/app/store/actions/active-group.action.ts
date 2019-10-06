import {Action} from '@ngrx/store';
import {Actions} from "@ngrx/effects";
import {GroupDto} from "../../api/web-console/models/group-dto";

export enum ActiveGroupActionEnum {
  SET_ACTIVE_GROUP_REQUEST = '[ActiveGroup] set request',
}

/**
 * MOBILE Actions
 */
export class SetActiveGroupRequestAction implements Action {
  readonly type = ActiveGroupActionEnum.SET_ACTIVE_GROUP_REQUEST;

  constructor(public payload: string) {
  }
}

export type ActiveGroupActions = SetActiveGroupRequestAction;
