import {TitleValueListDto} from "../../api/web-console/models/title-value-list-dto";

export interface PositionState {
  positions: TitleValueListDto;
}

export const initialPositionState: PositionState = {
  positions: null
}
