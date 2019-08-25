import {InviterListDto} from "../../api/web-console/models/inviter-list-dto";

export interface InviteState {
  inviterList: InviterListDto;
}

export const initialInviteState: InviteState = {
  inviterList: null
}
