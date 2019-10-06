import {GroupDto} from "../../api/web-console/models/group-dto";

export interface GroupState {
  groups: GroupDto[];
  groupMap: {[key: string]: GroupDto}
}

export const initialGroupState: GroupState = {
  groups: [],
  groupMap: {}
}
