import {MeDto} from "../../api/web-console/models/me-dto";
import {TokenRequiredDto} from "../../api/web-console/models/token-required-dto";

export interface MeState {
  meDto: MeDto,
  tokenRequiredDto: TokenRequiredDto
}

export const initialMeState: MeState = {
  meDto: null,
  tokenRequiredDto: null
}
