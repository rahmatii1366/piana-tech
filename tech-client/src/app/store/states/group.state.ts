import {GroupDto} from "../../api/web-console/models/group-dto";

export interface GroupState {
  group: GroupDto;
}

export const initialGroupState: GroupState = {
  group: null
}
