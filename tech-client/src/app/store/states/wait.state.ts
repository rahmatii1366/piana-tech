import {MeDto} from "../../api/web-console/models/me-dto";
import {TokenRequiredDto} from "../../api/web-console/models/token-required-dto";

export interface WaitState {
  showSpinner: boolean;
}

export const initialWaitState: WaitState = {
  showSpinner: false
}
