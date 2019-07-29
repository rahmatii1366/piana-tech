package ir.piana.tech.business.data.service;

import ir.piana.tech.api.dto.MeDto;
import ir.piana.tech.api.dto.RoleEnum;
import ir.piana.tech.api.dto.RuleEnum;
import ir.piana.tech.business.data.entity.UserEntity;
import ir.piana.tech.business.data.repository.UserRepository;
import ir.piana.tech.business.helper.EmailHelper;
import ir.piana.tech.business.helper.JwtHelper;
import ir.piana.tech.business.enums.GenderType;
import ir.piana.tech.core.enums.RoleType;
import ir.piana.tech.core.enums.RuleType;
import ir.piana.tech.core.exception.PianaHttpException;
import ir.piana.tech.core.exception.UserRelatedException;
import ir.piana.tech.core.model.MeModel;
import ir.piana.tech.core.secuity.PianaAuthenticationService;
import org.jasypt.encryption.StringEncryptor;
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
//    private Map<String, String> uuidMap = new LinkedHashMap<>();

    @Autowired
    @Qualifier("getStandardPBEStringEncryptor")
    private StringEncryptor stringEncryptor;

    @Transactional
    public MeModel signup(String email, String password) throws PianaHttpException {
//        if(valueWrapper != null) {
//            signupCache.evict(email);
//            userEntity = (UserEntity) valueWrapper.get();
//        } else {
//            userEntity = new UserEntity();
//            userEntity.setEmail(email);
//            userEntity.setPassword(stringEncryptor.encrypt(password));
//            userEntity.setRoleType(RoleType.USER);
//            userEntity.setRuleType(RuleType.VERIFY_EMAIL);
//            signupCache.put(email, userEntity);
//        }
        UserEntity userEntity = null;
        userEntity = checkSignupRequest(email, password);

        Cache cache = cacheManager.getCache("signup");
        Cache.ValueWrapper valueWrapper = cache.get(email);
        String code = null;
        if(valueWrapper != null) {
            code = (String) valueWrapper.get();
        } else {
            code = getRandomNumberString();
        }
        cache.evict(email);
        cache.put(email, code);

//        session.setAttribute("email", email);
//        session.setAttribute("password", password);
//        UUID uuid = UUID.randomUUID();
//        String linkVar = Base64.getEncoder().encodeToString(
//                uuid.toString().concat(":").concat(email).getBytes());
//        String link = linkPrefix + "api/guest/signup/verify" + "?link=" + linkVar;
//        uuidMap.put(email, uuid.toString());
//        loginMap.put(email, code);

        emailHelper.sendEmail(email, "کد فعالسازی", code);

//        return MeModel.builder().email(email).role(RoleType.GUEST).rule(RuleType.VERIFY_EMAIL).build();
        return authenticationService.authenticateMe(userEntity);
    }

//    @Transactional
//    public MeDto verify(String link) throws PianaHttpException {
//        String[] split = new String(Base64.getDecoder().decode(link)).split(":");
//        String uuid = split[0];
//        String email = split[1];
//        String orgUuid = uuidMap.containsKey(email) ? uuidMap.remove(email) : null;
//        if(orgUuid == null)
//            throw new ServerRelatedException("signup request not exist");
//        else if (!orgUuid.equalsIgnoreCase(uuid))
//            throw new UserRelatedException("code not exist");
//        else {
//            Example<UserEntity> userEntityExample = Example.of(new UserEntity(email));
//            Optional<UserEntity> one = userRepository.findOne(userEntityExample);
//            if(one.isPresent()) {
//                UserEntity userEntity = one.get();
//                userEntity.setVerified(true);
//                userEntity.setRoleType(RoleType.NEED_PASSWORD);
//                userRepository.save(userEntity);
//                return createMeDto(email, RoleEnum.USER, RuleEnum.LOGIN_SET_PASSWORD);
//            }
//            throw new ServerRelatedException("UNKNOWN EXCEPTION");
//        }
//    }

    @Transactional
    public MeModel verify(String code) throws PianaHttpException {
//        Object emailObj = session.getAttribute("email");
//        Object passwordObj = session.getAttribute("password");
//        if(emailObj == null || passwordObj == null)
//            throw new UserRelatedException("email or password not exist");
        UserEntity userEntity = authenticationService.getUserEntity();
        Cache cache = cacheManager.getCache("signup");
        Cache.ValueWrapper valueWrapper = cache.get(userEntity.getEmail());
        if(valueWrapper != null) {
            String orgCode = (String) valueWrapper.get();
            if(!code.equalsIgnoreCase(orgCode))
                throw new UserRelatedException("code invalid!");
        } else
            throw new UserRelatedException("code expired!");

        cache.evict(userEntity.getEmail());
        userEntity.setVerified(true);
        userEntity.setRuleType(RuleType.FREE);
        userRepository.save(userEntity);
        return authenticationService.authenticateMe(userEntity);
    }

    @Transactional
    public UserEntity checkSignupRequest(String email, String password) throws PianaHttpException {
        Example<UserEntity> userEntityExample = Example.of(new UserEntity(email));
        Optional<UserEntity> one = userRepository.findOne(userEntityExample);
        if (one.isPresent() && one.get().isVerified())
            throw new UserRelatedException("duplicated email");
        else if(one.isPresent() && !one.get().isVerified()) {
            one.get().setPassword(stringEncryptor.encrypt(password));
            return userRepository.save(one.get());
        }
        UserEntity userEntity = new UserEntity();
        userEntity.setEmail(email);
        userEntity.setPassword(stringEncryptor.encrypt(password));
        userEntity.setVerified(false);
        userEntity.setRuleType(RuleType.VERIFY_EMAIL);
        userEntity.setRoleType(RoleType.USER);
        return userRepository.save(userEntity);
    }

    @Transactional
    public UserEntity createForSignup(String email) throws PianaHttpException {
        Example<UserEntity> userEntityExample = Example.of(new UserEntity(email));
        Optional<UserEntity> one = userRepository.findOne(userEntityExample);
        if (!one.isPresent()) {
            UserEntity userEntity = new UserEntity(email);
            userEntity.setGender(GenderType.UNKNOWN);
            userRepository.save(userEntity);
            return userEntity;
        } else {
            UserEntity userEntity = one.get();
            if(userEntity.getPassword() != null)
                throw new UserRelatedException("duplicated");
            return userEntity;
        }
    }

    public MeModel login(String email, String password) throws UserRelatedException {
        Example<UserEntity> userEntityExample = Example.of(new UserEntity(email, stringEncryptor.encrypt(password)));
        Optional<UserEntity> one = userRepository.findOne(userEntityExample);
        return authenticationService.authenticateMe(
                one.orElseThrow(() -> new UserRelatedException("credential not correct")));
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
