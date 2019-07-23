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
import ir.piana.tech.core.exception.PianaHttpException;
import ir.piana.tech.core.exception.PianaHttpExceptionRT;
import ir.piana.tech.core.exception.ServerRelatedException;
import ir.piana.tech.core.exception.UserRelatedException;
import ir.piana.tech.core.secuity.PianaAuthenticationService;
import org.jasypt.encryption.StringEncryptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
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
    public MeDto signup(String email, String password) throws PianaHttpExceptionRT {
        signupRequest(email);
        String randomNumberString = getRandomNumberString();
        session.setAttribute("verify-code", randomNumberString);
        session.setAttribute("email", email);
        session.setAttribute("password", password);

//        UUID uuid = UUID.randomUUID();
//        String linkVar = Base64.getEncoder().encodeToString(
//                uuid.toString().concat(":").concat(email).getBytes());
//        String link = linkPrefix + "api/guest/signup/verify" + "?link=" + linkVar;
//        uuidMap.put(email, uuid.toString());

        loginMap.put(email, randomNumberString);
        emailHelper.sendEmail(email, "ارسال لینک فعالسازی", randomNumberString);

        return createMeDto(email, RoleEnum.GUEST, RuleEnum.LOGIN_VERIFY_EMAIL);
    }

//    @Transactional
//    public MeDto verify(String link) throws PianaHttpExceptionRT {
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
    public MeDto verify(String code) throws PianaHttpExceptionRT {
        Object emailObj = session.getAttribute("email");
        Object passwordObj = session.getAttribute("password");
        if(emailObj == null || passwordObj == null)
            throw new UserRelatedException("email or password not exist");
        String email = (String) emailObj;
        String password = (String) passwordObj;
        String orgCode = loginMap.containsKey(email) ? loginMap.remove(email) : null;
        if(orgCode == null)
            throw new ServerRelatedException("signup request not exist");
        else if (!orgCode.equalsIgnoreCase(code))
            throw new UserRelatedException("code not exist");
        else {
            Example<UserEntity> userEntityExample = Example.of(new UserEntity(email));
            Optional<UserEntity> one = userRepository.findOne(userEntityExample);
            if(one.isPresent()) {
                throw new ServerRelatedException("UNKNOWN EXCEPTION");
            }
            UserEntity userEntity = new UserEntity();
            userEntity.setEmail(email);
            userEntity.setPassword(stringEncryptor.encrypt(password));
            userEntity.setVerified(true);
            userEntity.setRoleType(RoleType.USER);
            userRepository.save(userEntity);
            return authenticationService.authenticate(userEntity);
        }
    }

    @Transactional
    public void signupRequest(String email) throws PianaHttpExceptionRT {
        Example<UserEntity> userEntityExample = Example.of(new UserEntity(email));
        Optional<UserEntity> one = userRepository.findOne(userEntityExample);
        if (one.isPresent())
            throw new UserRelatedException("duplicated email");
    }

    @Transactional
    public UserEntity createForSignup(String email) throws PianaHttpExceptionRT {
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

    public UserEntity login(String email, String password) throws UserRelatedException {
        Example<UserEntity> userEntityExample = Example.of(new UserEntity(email, password));
        Optional<UserEntity> one = userRepository.findOne(userEntityExample);
        return one.orElseThrow(() -> new UserRelatedException("credential not correct"));
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
