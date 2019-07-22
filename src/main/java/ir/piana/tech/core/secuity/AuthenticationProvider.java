package ir.piana.tech.core.secuity;

import ir.piana.tech.business.data.entity.UserEntity;
import ir.piana.tech.business.data.service.UserService;
import ir.piana.tech.core.exception.UserRelatedException;
import org.jasypt.encryption.StringEncryptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * @author Mohamad Rahmati (rahmatii1366@gmail.com)
 * Date: 7/15/2019 3:36 PM
 **/
@Component
public class AuthenticationProvider {
    private Map<String, AuthenticationImpl> userMap = new LinkedHashMap<>();

    @Autowired
    private UserService userService;

    @Autowired
    @Qualifier("getStandardPBEStringEncryptor")
    private StringEncryptor stringEncryptor;

    public String register(String email, String password) throws UserRelatedException {
        String encrypt = stringEncryptor.encrypt(email.concat(":").concat(password));
        if (userMap.containsKey(encrypt))
            throw new UserRelatedException("this user already logged in");
        UserEntity userEntity = userService.login(email, password);
        String encrypt2 = stringEncryptor.encrypt(email.concat(":").concat(password));
        List<GrantedAuthorityImpl> authorities = Arrays.asList(new GrantedAuthorityImpl(userEntity.getRoleType()));
        userMap.put(encrypt, new AuthenticationImpl(userEntity, encrypt, authorities));
        return encrypt2;
    }

    public Authentication getAuthentication(String uuid) {
        AuthenticationImpl authentication = userMap.get(uuid);
        if(authentication == null)
            return new UsernamePasswordAuthenticationToken(uuid, "123456");
        return authentication;
    }
}
