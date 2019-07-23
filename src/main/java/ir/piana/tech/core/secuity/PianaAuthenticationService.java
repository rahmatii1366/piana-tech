package ir.piana.tech.core.secuity;

import ir.piana.tech.api.dto.MeDto;
import ir.piana.tech.api.dto.RoleEnum;
import ir.piana.tech.business.data.entity.UserEntity;
import ir.piana.tech.business.data.service.UserService;
import ir.piana.tech.core.exception.UserRelatedException;
import org.jasypt.encryption.StringEncryptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpSession;
import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * @author Mohamad Rahmati (rahmatii1366@gmail.com)
 * Date: 7/15/2019 3:36 PM
 **/
@Component
public class PianaAuthenticationService {
    private Map<String, UsernamePasswordAuthenticationToken> userMap = new LinkedHashMap<>();

    @Autowired
    private HttpSession session;

    @Autowired
    private UserService userService;

    @Autowired
    @Qualifier("getStandardPBEStringEncryptor")
    private StringEncryptor stringEncryptor;

    public MeDto login(String email, String password) throws UserRelatedException {
        UserEntity userEntity = userService.login(email, password);
        return authenticate(userEntity);
    }

    public MeDto authenticate(UserEntity userEntity) {
        List<PianaGrantedAuthority> authorities = Arrays.asList(new PianaGrantedAuthority(userEntity.getRoleType()));
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                userEntity, null, authorities);
        SecurityContext securityContext = SecurityContextHolder.getContext();
//        Authentication authentication = securityContext.getAuthentication();
        session.invalidate();
        securityContext.setAuthentication(authenticationToken);
        MeDto meDto = new MeDto();
        meDto.setEmail(userEntity.getEmail());
        meDto.setRole(RoleEnum.fromValue(authorities.get(0).getAuthority()));
        return meDto;
    }

    public Authentication getAuthentication(String uuid) {
        UsernamePasswordAuthenticationToken authentication = userMap.get(uuid);
        if(authentication == null)
            return new UsernamePasswordAuthenticationToken(uuid, "123456");
        return authentication;
    }
}
