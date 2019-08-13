import {MeDto} from "../../api/web-console/models/me-dto";
import {TokenRequiredDto} from "../../api/web-console/models/token-required-dto";
import {AllAgeLevelsDto} from "../../api/web-console/models/all-age-levels-dto";

export interface AgeLevelState {
  ageLevels: AllAgeLevelsDto;
}

export const initialAgeLevelState: AgeLevelState = {
  ageLevels: null
}
