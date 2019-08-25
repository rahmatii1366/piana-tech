package ir.piana.tech.core.api;

import ir.piana.tech.api.dto.GroupDto;
import ir.piana.tech.api.dto.InviteDto;
import ir.piana.tech.api.dto.InviterDto;
import ir.piana.tech.api.dto.InviterListDto;
import ir.piana.tech.api.service.UserApiDelegate;
import ir.piana.tech.business.data.entity.GroupEntity;
import ir.piana.tech.business.data.service.GroupService;
import ir.piana.tech.business.data.service.UserService;
import ir.piana.tech.core.enums.AgeLevelType;
import ir.piana.tech.core.mapper.*;
import ir.piana.tech.core.secuity.PianaAuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.stereotype.Component;

/**
 * @author Mohamad Rahmati (rahmatii1366@gmail.com)
 * Date: 7/20/2019 11:37 AM
 **/
@Component
public class UserApiImpl implements UserApiDelegate {
    @Autowired
    private PianaAuthenticationService authenticationService;

    @Autowired
    private UserService userService;

    @Autowired
    private GroupService groupService;

    @Autowired
    private MeMapper meMapper;

    @Autowired
    private TokenActionMapper actionMapper;

    @Autowired
    private TokenTypeMapper typeMapper;

    @Autowired
    private AgeLevelTypeMapper ageLevelTypeMapper;

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
    public ResponseEntity<GroupDto> getGroup() {
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
    public ResponseEntity<Void> acceptInviteRequest(InviterDto inviterDto) {
        groupService.acceptInviteRequest(groupMapper.toInviterGroupModel(inviterDto));
        return ResponseEntity.ok().build();
    }

    @Override
    public ResponseEntity<Void> logout() {
        userService.logout();
        return ResponseEntity.ok().build();
    }

    public ResponseEntity<Void> inviteToGroup(InviteDto inviteDto) {
        groupService.invite(invitedMapper.toInvitedModels(inviteDto));
        return ResponseEntity.ok().build();
    }
}
