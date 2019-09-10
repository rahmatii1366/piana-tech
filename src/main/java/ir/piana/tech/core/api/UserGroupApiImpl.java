package ir.piana.tech.core.api;

import ir.piana.pianatech.server.api.dto.GroupDto;
import ir.piana.pianatech.server.api.dto.InviteDto;
import ir.piana.pianatech.server.api.dto.InviterDto;
import ir.piana.pianatech.server.api.dto.InviterListDto;
import ir.piana.pianatech.server.api.service.UserGroupApi;
import ir.piana.tech.business.data.entity.GroupEntity;
import ir.piana.tech.business.data.service.GroupService;
import ir.piana.tech.core.enums.AgeLevelType;
import ir.piana.tech.core.mapper.GroupMapper;
import ir.piana.tech.core.mapper.InvitedMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;
import java.util.List;

/**
 * @author Mohamad Rahmati (rahmatii1366@gmail.com)
 * Date: 7/20/2019 11:37 AM
 **/
@RestController
public class UserGroupApiImpl implements UserGroupApi {
    @Autowired
    private GroupService groupService;

    @Autowired
    private GroupMapper groupMapper;

    @Autowired
    private InvitedMapper invitedMapper;

    @Autowired
    @Qualifier("sessionRegistry")
    private SessionRegistry sessionRegistry;

    @Override
    public ResponseEntity<GroupDto> createGroup(GroupDto createGroupDto) {
        groupService.createGroup(
                createGroupDto.getName(),
                createGroupDto.getLatitude(),
                createGroupDto.getLongitude(),
                AgeLevelType.fromValue(createGroupDto.getAgeLevel().getValue()));
        return ResponseEntity.ok().body(createGroupDto);
    }

    @Override
    public ResponseEntity<GroupDto> getOwnedGroup() {
        GroupEntity group = groupService.getGroup();
        GroupDto groupDto = groupMapper.toGroupDto(group);
        return ResponseEntity.ok().body(groupDto);
    }

    @Override
    public ResponseEntity<InviterListDto> getInviterGroups() {
        InviterListDto inviterListDto = groupMapper.toInviterListDto(groupService.getInviterGroups());
        return ResponseEntity.ok(inviterListDto);
    }

    @Override
    public ResponseEntity<List<GroupDto>> getMemberGroups() {
        return null;
    }

    @Override
    public ResponseEntity<Void> acceptInviteRequest(InviterDto inviterDto) {
        groupService.acceptInviteRequest(groupMapper.toInviterGroupModel(inviterDto));
        return ResponseEntity.ok().build();
    }

    @Override
    public ResponseEntity<Void> inviteToGroup(InviteDto inviteDto) {
        groupService.invite(invitedMapper.toInvitedModels(inviteDto));
        return ResponseEntity.ok().build();
    }

    @Override
    public ResponseEntity<Void> uploadGroupImage(@Valid MultipartFile image) {
        try {
            byte[] bytes = image.getBytes();
            String contentType = image.getContentType();
            System.out.println(contentType);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }
}
