package ir.piana.tech.business.data.service;

import ir.piana.pianatech.server.api.dto.MeDto;
import ir.piana.pianatech.server.api.dto.RoleEnum;
import ir.piana.pianatech.server.api.dto.RuleEnum;
import ir.piana.tech.business.data.entity.UserEntity;
import ir.piana.tech.business.data.repository.UserRepository;
import ir.piana.tech.business.helper.EmailHelper;
import ir.piana.tech.business.helper.JwtHelper;
import ir.piana.tech.core.enums.RoleType;
import ir.piana.tech.core.enums.RuleType;
import ir.piana.tech.core.enums.TokenAction;
import ir.piana.tech.core.enums.TokenType;
import ir.piana.tech.core.exception.PianaHttpException;
import ir.piana.tech.core.exception.TokenRelatedException;
import ir.piana.tech.core.exception.UserRelatedException;
import ir.piana.tech.core.model.MeModel;
import ir.piana.tech.core.secuity.PianaAuthenticationService;
import ir.piana.tech.core.service.TokenService;
import ir.piana.tech.core.util.PianaDigester;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpSession;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Optional;
import java.util.Random;

/**
 * @author Mohamad Rahmati (rahmatii1366@gmail.com)
 * Date: 7/14/2019 2:45 PM
 **/
@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private HttpSession session;

    @Autowired
    private EmailHelper emailHelper;

    @Autowired
    private PianaAuthenticationService authenticationService;

    @Autowired
    private JwtHelper jwtHelper;

//    @Autowired
//    private HazelcastInstance instance;

    @Autowired
    private CacheManager cacheManager;

    @Value("${piana.email.link.prefix}")
    private String linkPrefix;

    @Autowired
    private Random random;

    private Map<String, String> loginMap = new LinkedHashMap<>();

    @Autowired
    @Qualifier("getPianaDigester")
    private PianaDigester pianaDigester;

    @Autowired
    private TokenService tokenService;

    @Transactional
    public void signup(String username, String mobile, String password)
            throws TokenRelatedException {
        UserEntity userEntity = null;
        userEntity = createMobileEntityForSignup(username, mobile, password);

        authenticationService.authenticateMe(userEntity);
        tokenService.addToken(mobile, TokenType.MOBILE, TokenAction.SIGNUP, userEntity);
    }

    public MeModel login(String mobile, String password) throws UserRelatedException {
        Example<UserEntity> userEntityExample = Example.of(
                new UserEntity(mobile, pianaDigester.digest(password)));
        Optional<UserEntity> one = userRepository.findOne(userEntityExample);
        return authenticationService.authenticateMe(
                one.orElseThrow(() -> new UserRelatedException("Mobile number or Password are incorrect")));
    }

    public void logout() throws UserRelatedException {
        authenticationService.logout();
    }

    public void forgetPassword(String mobile, String newPassword)
            throws TokenRelatedException {
        UserEntity userEntity = findUserEntity(mobile);
        Cache cache = cacheManager.getCache("forget-password");
        cache.put(mobile, newPassword);
        tokenService.addToken(mobile, TokenType.MOBILE, TokenAction.FORGET_PASSWORD, userEntity);
    }

    @Transactional
    public MeModel verify(String code, TokenType tokenType, TokenAction tokenAction) throws PianaHttpException {
        tokenService.checkAndRevokeToken(code, tokenType, tokenAction);
        UserEntity userEntity = authenticationService.getUserEntity();
        userEntity.setMobileVerified(true);
        userEntity.setRuleType(RuleType.FREE);
        userRepository.save(userEntity);
        return authenticationService.authenticateMe(userEntity);
    }

    @Transactional
    public UserEntity createMobileEntityForSignup(
            String username, String mobile, String password)
            throws PianaHttpException {
        Example<UserEntity> mobileEntityExample = Example.of(
                new UserEntity(mobile));
        Optional<UserEntity> one = userRepository.findOne(mobileEntityExample);
        if (!one.isPresent()) {
            UserEntity userEntity = new UserEntity();
            userEntity.setMobile(mobile);
            userEntity.setPassword(pianaDigester.digest(password));
            userEntity.setMobileVerified(false);
            userEntity.setUsername(username == null ? mobile : username);
            userEntity.setEmailVerified(false);
            userEntity.setRuleType(RuleType.VERIFY_MOBILE);
            userEntity.setRoleType(RoleType.USER);
            return userRepository.save(userEntity);
        } else {
            if (one.get().getMobileVerified())
                throw new UserRelatedException("this mobile already registered");
            UserEntity userEntity = one.get();
            userEntity.setPassword(pianaDigester.digest(password));
            userEntity.setUsername(username);
            return userEntity;
        }
    }

    @Transactional
    public UserEntity findUserEntity(String mobile)
            throws PianaHttpException {
        Example<UserEntity> mobileEntityExample = Example.of(
                UserEntity.builder().mobile(mobile).build());
        UserEntity userEntity = userRepository.findOne(mobileEntityExample)
                .orElseThrow(() -> new UserRelatedException("mobile not registered"));
        if (!userEntity.getMobileVerified())
            throw new UserRelatedException("mobile not verified!");
        return userEntity;
    }

    private MeDto createMeDto(String email, RoleEnum roleEnum, RuleEnum ruleEnum) {
        if(email == null || email.isEmpty())
            throw new UserRelatedException("email is null");
        MeDto meDto = new MeDto();
        meDto.setEmail(email);
        meDto.setRole(roleEnum == null ? RoleEnum.GUEST : roleEnum);
        meDto.setRule(ruleEnum == null ? RuleEnum.FREE : ruleEnum);
        return meDto;
    }

    public String getRandomNumberString() {
        // It will generate 6 digit random Number.
        // from 0 to 999999
        int number = random.nextInt(999999);

        // this will convert any number sequence into 6 character.
        return String.format("%06d", number);
    }

}
