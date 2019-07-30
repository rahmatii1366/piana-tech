import {MeDto} from "../../api/web-console/models/me-dto";

export interface MeState {
  meDto: MeDto
}

export const initialMeState: MeState = {
  meDto: null
}
