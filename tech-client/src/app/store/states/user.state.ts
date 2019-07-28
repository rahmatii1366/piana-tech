import {MeDto} from "../../api/web-console/models/me-dto";

export interface IUserState {
  meDto: MeDto
}

export const initialUserState: IUserState = {
  meDto: null
}
