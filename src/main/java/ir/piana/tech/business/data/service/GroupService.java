package ir.piana.tech.business.data.service;

import ir.piana.tech.business.data.entity.GroupEntity;
import ir.piana.tech.business.data.entity.InviteEntity;
import ir.piana.tech.business.data.entity.UserEntity;
import ir.piana.tech.business.data.repository.GroupRepository;
import ir.piana.tech.business.data.repository.InviteRepository;
import ir.piana.tech.business.data.repository.UserRepository;
import ir.piana.tech.business.helper.EmailHelper;
import ir.piana.tech.core.enums.*;
import ir.piana.tech.core.exception.NotFoundRelatedException;
import ir.piana.tech.core.exception.PianaHttpException;
import ir.piana.tech.core.exception.UserRelatedException;
import ir.piana.tech.core.mapper.GroupMapper;
import ir.piana.tech.core.model.InvitedUserModel;
import ir.piana.tech.core.model.InviterGroupModel;
import ir.piana.tech.core.secuity.PianaAuthenticationService;
import ir.piana.tech.core.util.PianaDigester;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpSession;
import java.util.*;

/**
 * @author Mohamad Rahmati (rahmatii1366@gmail.com)
 * Date: 7/14/2019 2:45 PM
 **/
@Service
public class GroupService {
    @Autowired
    private GroupRepository groupRepository;

    @Autowired
    private InviteRepository inviteRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private HttpSession session;

    @Autowired
    private EmailHelper emailHelper;

    @Autowired
    private PianaAuthenticationService authenticationService;

    @Autowired
    private CacheManager cacheManager;

    @Value("${piana.email.link.prefix}")
    private String linkPrefix;

    @Autowired
    private Random random;

    @Autowired
    @Qualifier("getPianaDigester")
    private PianaDigester pianaDigester;

    @Autowired
    private GroupMapper groupMapper;

    @Transactional
    public GroupEntity getGroup()
            throws PianaHttpException {
        UserEntity userEntity = authenticationService.getUserEntity();
        Optional<GroupEntity> optionalGroupEntity = groupRepository.findByUserEntity(userEntity);
//        GroupDto groupDto = groupMapper.toGroupDto(optionalGroupEntity.get());
        return optionalGroupEntity.orElseThrow(() -> new NotFoundRelatedException("group not exist!"));
    }

    @Transactional
    public void createGroup(String name, double latitude, double longitude, AgeLevelType ageLevelType)
            throws PianaHttpException {
        UserEntity userEntity = authenticationService.getUserEntity();
        Optional<GroupEntity> optionalGroupEntity = groupRepository.findByUserEntity(userEntity);
        if(optionalGroupEntity.isPresent())
            throw new UserRelatedException("double group not permission");
        optionalGroupEntity = groupRepository.findByName(name);
        if(optionalGroupEntity.isPresent())
            throw new UserRelatedException("name is already registered");

        GroupEntity groupEntity = GroupEntity.builder()
                .name(name).userEntity(userEntity)
                .ageLevel(ageLevelType)
                .latitude(latitude).longitude(longitude)
                .members(new ArrayList<>())
                .build();
        groupRepository.save(groupEntity);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void invite(List<InvitedUserModel> invitedUserModels)
            throws PianaHttpException {
        GroupEntity groupEntity = getGroup();
        List<InvitedUserModel> shouldInviteList = getShouldInviteList(groupEntity.getInvitedUserModels(), invitedUserModels);
        for (InvitedUserModel invitedUserModel : shouldInviteList) {
//            Optional<UserEntity> userEntity = userRepository.findByMobile(invitedUserModel.getMobile());
//            if (userEntity.isPresent()) {
//            }
            Optional<InviteEntity> inviteEntityOptional = inviteRepository.findByMobile(invitedUserModel.getMobile());
            InviteEntity inviteEntity = null;
            if (inviteEntityOptional.isPresent()) {
                inviteEntity = inviteEntityOptional.get();
            } else {
                inviteEntity = new InviteEntity();
            }
            inviteEntity.setMobile(invitedUserModel.getMobile());
            if (!ifAlreadyInvited(inviteEntity.getInviterGroupModels(), groupEntity)) {
                inviteEntity.addInverterGroup(groupEntity);
                inviteRepository.save(inviteEntity);
            }
            groupEntity.addInvitedUserModel(invitedUserModel);
        }
        groupRepository.save(groupEntity);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public List<InviterGroupModel> getInviterGroups()
            throws PianaHttpException {
        UserEntity userEntity = authenticationService.getUserEntity();
        Optional<InviteEntity> byMobile = inviteRepository.findByMobile(userEntity.getMobile());
        if(byMobile.isPresent())
            return byMobile.get().getInviterGroupModels();
        return new ArrayList<>();
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void acceptInviteRequest(InviterGroupModel inviterGroupModel)
            throws PianaHttpException {
        UserEntity userEntity = authenticationService.getUserEntity();
        Optional<InviteEntity> inviteEntityOptional = inviteRepository.findByMobile(userEntity.getMobile());
        if(!inviteEntityOptional.isPresent())
            throw new UserRelatedException("invite request not exist!");
        InviteEntity inviteEntity = inviteEntityOptional.get();
//        Optional<UserEntity> userEntityOptional = userRepository.findByMobile(inviteEntity.getMobile());
        Optional<GroupEntity> groupEntityOptional = groupRepository.findById(inviterGroupModel.getGroupId());
        userEntity.addGroupEntity(groupEntityOptional.get());
        userRepository.save(userEntity);
        inviteEntity.setInviterGroupModels(removeFromInverterGroups(
                inviteEntity.getInviterGroupModels(), inviterGroupModel));
        inviteRepository.save(inviteEntity);
        groupEntityOptional.get().setInvitedUserModels(removeFromInvertedUsers(
                groupEntityOptional.get().getInvitedUserModels(), userEntity.getMobile()));
        groupRepository.save(groupEntityOptional.get());
    }

//    public List<SingletonMap> getAgeLevels()
//            throws PianaHttpException {
//        new SingletonMap().put()
//        return Arrays.asList(AgeLevelType.values());
//    }

//    private MeDto createMeDto(String email, RoleEnum roleEnum, RuleEnum ruleEnum) {
//        if(email == null || email.isEmpty())
//            throw new UserRelatedException("email is null");
//        MeDto meDto = new MeDto();
//        meDto.setEmail(email);
//        meDto.setRole(roleEnum == null ? RoleEnum.GUEST : roleEnum);
//        meDto.setRule(ruleEnum == null ? RuleEnum.FREE : ruleEnum);
//        return meDto;
//    }

    public synchronized List<InviterGroupModel> removeFromInverterGroups(List<InviterGroupModel> inviterGroupModels, InviterGroupModel inviterGroupModel) {
        List<InviterGroupModel> newList = new ArrayList<>();
        if(inviterGroupModels != null) {
            for(InviterGroupModel model : inviterGroupModels) {
                if(model.getGroupId() != inviterGroupModel.getGroupId()){
                    newList.add(model);
                }
            }
        }
        return newList;
    }

    public synchronized List<InvitedUserModel> removeFromInvertedUsers(
            List<InvitedUserModel> invitedUserModels, String mobile) {
        List<InvitedUserModel> newList = new ArrayList<>();
        if(invitedUserModels != null) {
            for(InvitedUserModel model : invitedUserModels) {
                if(!model.getMobile().equals(mobile)){
                    newList.add(model);
                }
            }
        }
        return newList;
    }

    public String getRandomNumberString() {
        // It will generate 6 digit random Number.
        // from 0 to 999999
        int number = random.nextInt(999999);

        // this will convert any number sequence into 6 character.
        return String.format("%06d", number);
    }

    private List<InvitedUserModel> getShouldInviteList(List<InvitedUserModel> alreadyInvitedUserModels, List<InvitedUserModel> invitedUserModels) {
        if(alreadyInvitedUserModels == null || alreadyInvitedUserModels.isEmpty())
            return invitedUserModels;
        List<InvitedUserModel> shouldInvite = new ArrayList<>();
        for (InvitedUserModel userModel : invitedUserModels) {
            boolean exist = false;
            for (int i = 0; i < alreadyInvitedUserModels.size(); i++) {
                if(userModel.getMobile().equalsIgnoreCase(invitedUserModels.get(i).getMobile())) {
                    exist = true;
                    break;
                }
            }
            if(!exist)
                shouldInvite.add(userModel);
        }
        return shouldInvite;
    }

    private boolean ifAlreadyInvited(List<InviterGroupModel> inviterGroupModels, GroupEntity groupEntity) {
        if(inviterGroupModels == null)
            return false;
        for (InviterGroupModel groupModel : inviterGroupModels) {
            if(groupModel.getGroupId() == groupEntity.getId())
                return true;
        }
        return false;
    }

}
