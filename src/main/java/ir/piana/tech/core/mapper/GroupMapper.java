package ir.piana.tech.core.mapper;

import ir.piana.tech.api.dto.*;
import ir.piana.tech.business.data.entity.GroupEntity;
import ir.piana.tech.core.enums.AgeLevelType;
import ir.piana.tech.core.model.InviterGroupModel;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import java.util.List;

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

    @Mappings({
            @Mapping(target = "groupId", source = "groupId"),
            @Mapping(target = "groupName", source = "groupName"),
            @Mapping(target = "isSeen", source = "seen"),
    })
    public abstract InviterDto toInviterDto(InviterGroupModel inviterGroupModel);

    @Mappings({
            @Mapping(target = "groupId", source = "groupId"),
            @Mapping(target = "groupName", source = "groupName"),
            @Mapping(target = "isSeen", source = "isSeen"),
    })
    public abstract InviterGroupModel toInviterGroupModel(InviterDto inviterDto);

    public InviterListDto toInviterListDto(List<InviterGroupModel> inviterGroupModelList) {
        InviterListDto inviterListDto = new InviterListDto();
        inviterGroupModelList.forEach(model -> inviterListDto.addInvitersItem(toInviterDto(model)));
        return inviterListDto;
    }
}
