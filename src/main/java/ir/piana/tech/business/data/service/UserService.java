package ir.piana.tech.business.data.service;

import ir.piana.tech.business.data.entity.UserEntity;
import ir.piana.tech.business.data.repository.UserRepository;
import ir.piana.tech.business.helper.EmailHelper;
import ir.piana.tech.business.helper.JwtHelper;
import ir.piana.tech.business.enums.GenderType;
import ir.piana.tech.core.enums.RoleType;
import ir.piana.tech.core.exception.PianaHttpException;
import ir.piana.tech.core.exception.ServerRelatedException;
import ir.piana.tech.core.exception.UserRelatedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    private EmailHelper emailHelper;

    @Autowired
    private JwtHelper jwtHelper;

    @Value("${piana.email.link.prefix}")
    private String linkPrefix;

    private Map<String, String> uuidMap = new LinkedHashMap<>();

    @Transactional
    public String signup(String email) throws PianaHttpException {
        UserEntity userEntity = createForSignup(email);
        UUID uuid = UUID.randomUUID();
        String linkVar = Base64.getEncoder().encodeToString(
                uuid.toString().concat(":").concat(email).getBytes());
        String link = linkPrefix + "users/sign-up/verify" + "?link=" + linkVar;
        uuidMap.put(email, uuid.toString());
        emailHelper.sendEmail(email, "ارسال لینک فعالسازی", link);

        return jwtHelper.createJwtToken(userEntity);
    }

    @Transactional
    public String verify(String link) throws PianaHttpException {
        String[] split = new String(Base64.getDecoder().decode(link)).split(":");
        String uuid = split[0];
        String email = split[1];
        String orgUuid = uuidMap.containsKey(email) ? uuidMap.remove(email) : null;
        if(orgUuid == null)
            throw new ServerRelatedException("signup request not exist");
        else if (!orgUuid.equalsIgnoreCase(uuid))
            throw new UserRelatedException("code not exist");
        else {
            Example<UserEntity> userEntityExample = Example.of(new UserEntity(email));
            Optional<UserEntity> one = userRepository.findOne(userEntityExample);
            if(one.isPresent()) {
                UserEntity userEntity = one.get();
                userEntity.setVerified(true);
                userEntity.setRoleType(RoleType.NEED_PASSWORD);
                userRepository.save(userEntity);
                return jwtHelper.createJwtToken(userEntity);
            }
            throw new ServerRelatedException("UNKNOWN EXCEPTION");
        }
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

    public UserEntity login(String email, String password) throws UserRelatedException {
        Example<UserEntity> userEntityExample = Example.of(new UserEntity(email, password));
        Optional<UserEntity> one = userRepository.findOne(userEntityExample);
        return one.orElseThrow(() -> new UserRelatedException("credential not correct"));
    }
}
