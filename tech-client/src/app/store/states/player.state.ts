import {UserInfoDto} from "../../api/web-console/models/user-info-dto";
import {PlayerPositionDto} from "../../api/web-console/models/player-position-dto";
import {PlayerInfoDto} from "../../api/web-console/models/player-info-dto";
import {LocationDto} from "../../api/web-console/models/location-dto";

export interface PlayerState {
  playerPositionDto: PlayerPositionDto,
  playerInfoDto: PlayerInfoDto,
  playerLocationDto: LocationDto,
  userInfoDto: UserInfoDto
}

export const initialPlayerState: PlayerState = {
  playerPositionDto: null,
  playerInfoDto: null,
  playerLocationDto: null,
  userInfoDto: null
}
