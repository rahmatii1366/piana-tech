package ir.piana.tech.core.api;

import ir.piana.pianatech.server.api.dto.*;
import ir.piana.pianatech.server.api.service.UserGroupApi;
import ir.piana.tech.business.data.entity.GroupEntity;
import ir.piana.tech.business.data.service.GroupService;
import ir.piana.tech.core.enums.AgeLevelType;
import ir.piana.tech.core.mapper.GroupMapper;
import ir.piana.tech.core.mapper.InvitedMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import javax.xml.bind.DatatypeConverter;
import java.io.*;
import java.util.Arrays;
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
        GroupEntity group = groupService.createGroup(
                createGroupDto.getName(),
                createGroupDto.getLatitude(),
                createGroupDto.getLongitude(),
                AgeLevelType.fromValue(createGroupDto.getAgeLevel()));
        return ResponseEntity.ok().body(groupMapper.toGroupDto(group));
    }

    @Override
    public ResponseEntity<GroupDto> updateGroup(UpdateGroupDto groupDto) {
        GroupEntity group = groupService.updateGroup(
                groupDto.getCurrentName(),
                groupDto.getNewName(),
                groupDto.getLatitude(),
                groupDto.getLongitude(),
                AgeLevelType.fromValue(groupDto.getAgeLevel()));
        return ResponseEntity.ok().body(groupMapper.toGroupDto(group));
    }

    @Override
    public ResponseEntity<List<GroupDto>> getOwnGroups() {
        List<GroupEntity> groups = groupService.getGroups();
        List<GroupDto> groupDtoList = groupMapper.toGroupDtoList(groups);
        return ResponseEntity.ok().body(groupDtoList);
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
        groupService.invite(invitedMapper.toInvitedModels(inviteDto), inviteDto.getGroupName());
        return ResponseEntity.ok().build();
    }

    @Override
    public ResponseEntity<Void> uploadGroupImage(GroupImageDto groupImageDto) {
        groupService.addGroupImage(groupImageDto.getImage(), groupImageDto.getGroupName());
        return ResponseEntity.ok().build();
    }
}
