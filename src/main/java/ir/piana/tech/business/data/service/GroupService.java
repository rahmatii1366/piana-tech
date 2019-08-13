package ir.piana.tech.business.data.service;

import ir.piana.tech.api.dto.MeDto;
import ir.piana.tech.api.dto.RoleEnum;
import ir.piana.tech.api.dto.RuleEnum;
import ir.piana.tech.business.data.entity.GroupEntity;
import ir.piana.tech.business.data.entity.UserEntity;
import ir.piana.tech.business.data.repository.GroupRepository;
import ir.piana.tech.business.helper.EmailHelper;
import ir.piana.tech.business.helper.JwtHelper;
import ir.piana.tech.core.enums.*;
import ir.piana.tech.core.exception.PianaHttpException;
import ir.piana.tech.core.exception.TokenRelatedException;
import ir.piana.tech.core.exception.UserRelatedException;
import ir.piana.tech.core.model.MeModel;
import ir.piana.tech.core.secuity.PianaAuthenticationService;
import ir.piana.tech.core.service.TokenService;
import ir.piana.tech.core.util.PianaDigester;
import org.apache.commons.collections.map.SingletonMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;
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
                .name(name).userEntity(userEntity).ageLevel(ageLevelType)
                .latitude(latitude).longitude(longitude)
                .build();
        groupRepository.save(groupEntity);
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

    public String getRandomNumberString() {
        // It will generate 6 digit random Number.
        // from 0 to 999999
        int number = random.nextInt(999999);

        // this will convert any number sequence into 6 character.
        return String.format("%06d", number);
    }

}
