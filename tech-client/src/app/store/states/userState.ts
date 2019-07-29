import {MeDto} from "../../api/web-console/models/me-dto";

export interface UserState {
  meDto: MeDto
}

export const initialUserState: UserState = {
  meDto: null
}
