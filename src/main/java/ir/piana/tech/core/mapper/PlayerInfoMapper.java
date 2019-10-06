package ir.piana.tech.core.mapper;

import ir.piana.pianatech.server.api.dto.*;
import ir.piana.tech.business.data.entity.GroupEntity;
import ir.piana.tech.business.data.entity.UserInfoEntity;
import ir.piana.tech.core.enums.PlayerPositionType;
import ir.piana.tech.core.model.PlayerInfoModel;
import ir.piana.tech.core.model.PlayerPositionModel;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import java.util.List;

/**
 * @author Mohamad Rahmati (rahmatii1366@gmail.com)
 * Date: 7/24/2019 8:50 AM
 **/
@Mapper(componentModel = "spring")
public interface PlayerInfoMapper {
    PositionEnum toPositionEnum(PlayerPositionType positionType);
    PlayerPositionType toPositionType(PositionEnum positionEnum);
    PlayerInfoDto toPlayerInfoDto(PlayerInfoModel playerInfoModel);
    PlayerInfoModel toPlayerInfoModel(PlayerInfoDto playerInfoDto);
    PlayerPositionDto toPlayerPositionDto(PlayerPositionModel playerPositionModel);
    PlayerPositionModel toPlayerPositionModel(PlayerPositionDto playerPositionDto);
    UserInfoEntity toUserInfoEntity(UserInfoDto userInfoDto);
    UserInfoDto toUserInfoDto(UserInfoEntity userEntity);
    @Mappings({
            @Mapping(target = "username", source = "username"),
            @Mapping(target = "position", source = "positionType")
    })
    PlayerProfileDto toPlayerProfileDto(UserInfoEntity userInfoEntity);
    UserInfoEntity toUserInfoEntity(PlayerProfileDto playerProfileDto);
    List<PlayerProfileDto> toPlayerProfileDtoList(List<UserInfoEntity> groupEntity);
}
