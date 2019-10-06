package ir.piana.tech.core.secuity;

import ir.piana.tech.business.data.entity.UserEntity;
import ir.piana.tech.business.data.service.UserService;
import ir.piana.tech.core.enums.RuleType;
import ir.piana.tech.core.exception.ServerRelatedException;
import ir.piana.tech.core.exception.UserRelatedException;
import ir.piana.tech.core.model.MeModel;
import org.jasypt.encryption.StringEncryptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.session.SessionInformation;
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
    @Qualifier("getStandardPBEStringEncryptor")
    private StringEncryptor stringEncryptor;

    @Autowired
    private UserService userService;

    @Autowired
    @Qualifier("sessionRegistry")
    private SessionRegistry sessionRegistry;

    private void refreshSession(MeModel meModel) throws UserRelatedException {
        if(!session.isNew())
            session.invalidate();
        session.setAttribute("mobile", meModel);
    }

    protected MeModel createMeModel(UserEntity userEntity) {
        return MeModel.builder()
                .userId(userEntity.getId())
                .username(userEntity.getUserInfoEntity().getUsername())
                .mobile(userEntity.getMobile())
                .role(userEntity.getRoleType())
                .rule(userEntity.getRuleType())
                .imageExtension(userEntity.getUserInfoEntity().getImageExtension())
                .position(userEntity.getUserInfoEntity().getPositionType())
                .build();
    }

    public MeModel authenticateMe(UserEntity userEntity) {
        MeModel meModel = createMeModel(userEntity);
        refreshSession(meModel);
        List<PianaGrantedAuthority> authorities = null;
        if(userEntity.getRuleType() != RuleType.FREE) {
            authorities = Arrays.asList(new PianaGrantedAuthority(userEntity.getRuleType().getRole()));
        } else {
            authorities = Arrays.asList(new PianaGrantedAuthority(userEntity.getRoleType().getRole()));
        }
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                meModel, null, authorities);
        SecurityContext securityContext = SecurityContextHolder.getContext();
//        Authentication authentication = securityContext.getAuthentication();
        securityContext.setAuthentication(authenticationToken);
        sessionRegistry.registerNewSession(session.getId(), authenticationToken);
        return meModel;
    }

    public void logout() {
        String sessionId = session.getId();
        SessionInformation sessionInformation = sessionRegistry.getSessionInformation(sessionId);
        if(sessionInformation == null ||
                sessionInformation.isExpired() || sessionInformation.getPrincipal() == null)
            throw new UserRelatedException("session is expired or not logged in");
        session.invalidate();
        sessionRegistry.removeSessionInformation(sessionId);
    }

    public MeModel getMeModel() {
        SecurityContext securityContext = SecurityContextHolder.getContext();
        Authentication authentication = securityContext.getAuthentication();
        if(authentication.getPrincipal() instanceof MeModel) {
            return (MeModel) authentication.getPrincipal();
        }
        throw new ServerRelatedException("session not correct!");
    }

    public UserEntity getUserEntity() {
        SecurityContext securityContext = SecurityContextHolder.getContext();
        Authentication authentication = securityContext.getAuthentication();
        if(authentication.getPrincipal() instanceof MeModel) {
            return userService.findUserEntity(
                    ((MeModel) authentication.getPrincipal()).getUserId());
        }
        throw new ServerRelatedException("session not correct!");
    }
}
