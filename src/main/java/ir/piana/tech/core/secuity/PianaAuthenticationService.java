package ir.piana.tech.core.secuity;

import ir.piana.tech.business.data.entity.UserEntity;
import ir.piana.tech.business.data.service.UserService;
import ir.piana.tech.core.enums.RuleType;
import ir.piana.tech.core.exception.UserRelatedException;
import ir.piana.tech.core.model.MeModel;
import org.jasypt.encryption.StringEncryptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.session.SessionRegistry;
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

    @Autowired
    @Qualifier("sessionRegistry")
    private SessionRegistry sessionRegistry;

    private void refreshSession(UserEntity userEntity) throws UserRelatedException {
        if(!session.isNew())
            session.invalidate();
        session.setAttribute("user", userEntity);
    }

    public MeModel authenticateMe(UserEntity userEntity) {
        refreshSession(userEntity);
        List<PianaGrantedAuthority> authorities = null;
        if(userEntity.getRuleType() != RuleType.FREE) {
            authorities = Arrays.asList(new PianaGrantedAuthority(userEntity.getRuleType().getRole()));
        } else {
            authorities = Arrays.asList(new PianaGrantedAuthority(userEntity.getRoleType().getRole()));
        }
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                userEntity, null, authorities);
        SecurityContext securityContext = SecurityContextHolder.getContext();
//        Authentication authentication = securityContext.getAuthentication();
        securityContext.setAuthentication(authenticationToken);
        sessionRegistry.registerNewSession(session.getId(), authenticationToken);
        return MeModel.builder().email(userEntity.getEmail())
                .role(userEntity.getRoleType())
                .rule(userEntity.getRuleType())
                .build();
    }

    public UserEntity getUserEntity() {
        SecurityContext securityContext = SecurityContextHolder.getContext();
        Authentication authentication = securityContext.getAuthentication();
        return (UserEntity) authentication.getPrincipal();
    }
}
