package ir.piana.tech.core.mapper;

import ir.piana.tech.api.dto.InviteDto;
import ir.piana.tech.core.model.InvitedUserModel;
import org.mapstruct.Mapper;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Mohamad Rahmati (rahmatii1366@gmail.com)
 * Date: 7/24/2019 8:50 AM
 **/
@Mapper(componentModel = "spring")
public abstract class InvitedMapper {
    public InviteDto toInviteDto(List<InvitedUserModel> invitedUserModels) {
        InviteDto inviteDto = new InviteDto();
        for(InvitedUserModel model : invitedUserModels)
            inviteDto.addMobilesItem(model.getMobile());
        return inviteDto;
    }

    public List<InvitedUserModel> toInvitedModels(InviteDto inviteDto) {
        List<InvitedUserModel> inviteModels = new ArrayList<>();
        for(String dto : inviteDto.getMobiles())
            inviteModels.add(InvitedUserModel.builder().mobile(dto).build());
        return inviteModels;
    }
}
