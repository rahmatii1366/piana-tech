package ir.piana.tech.core.mapper;

import ir.piana.tech.api.dto.AgeLevelDto;
import ir.piana.tech.api.dto.AgeLevelEnum;
import ir.piana.tech.api.dto.GroupDto;
import ir.piana.tech.api.dto.MeDto;
import ir.piana.tech.business.data.entity.GroupEntity;
import ir.piana.tech.core.enums.AgeLevelType;
import ir.piana.tech.core.model.MeModel;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

/**
 * @author Mohamad Rahmati (rahmatii1366@gmail.com)
 * Date: 7/24/2019 8:50 AM
 **/
@Mapper(componentModel = "spring")
public abstract class GroupMapper {
    public AgeLevelType toAgeLevelType(AgeLevelDto ageLevelDto) {
        return AgeLevelType.fromValue(ageLevelDto.getValue());
    }

    public AgeLevelDto toAgeLevelDto(AgeLevelType ageLevelType) {
        AgeLevelDto ageLevelDto = new AgeLevelDto();
        ageLevelDto.setValue(ageLevelType.getValue());
        ageLevelDto.setTitle(ageLevelType.getFaTitle());
        return ageLevelDto;
    }

    @Mappings({
            @Mapping(target = "name", source = "name"),
            @Mapping(target = "latitude", source = "latitude"),
            @Mapping(target = "longitude", source = "longitude"),
            @Mapping(target = "ageLevel", source = "ageLevel"),
            @Mapping(target = "adminName", source = "userEntity.username")
    })
    public abstract GroupDto toGroupDto(GroupEntity groupEntity);

    @Mappings({
            @Mapping(target = "name", source = "name"),
            @Mapping(target = "latitude", source = "latitude"),
            @Mapping(target = "longitude", source = "longitude"),
            @Mapping(target = "ageLevel", source = "ageLevel"),
    })
    public abstract GroupEntity toGroupEntity(GroupDto groupDto);
}
