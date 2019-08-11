package ir.piana.tech.core.api;

import ir.piana.tech.api.dto.*;
import ir.piana.tech.api.service.GuestApiDelegate;
import ir.piana.tech.api.service.UserApiDelegate;
import ir.piana.tech.business.data.service.UserService;
import ir.piana.tech.core.mapper.MeMapper;
import ir.piana.tech.core.mapper.TokenActionMapper;
import ir.piana.tech.core.mapper.TokenTypeMapper;
import ir.piana.tech.core.secuity.PianaAuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.stereotype.Component;

/**
 * @author Mohamad Rahmati (rahmatii1366@gmail.com)
 * Date: 7/20/2019 11:37 AM
 **/
@Component
public class UserApiImpl implements UserApiDelegate {
    @Autowired
    private PianaAuthenticationService authenticationService;

    @Autowired
    private UserService userService;

    @Autowired
    private MeMapper meMapper;

    @Autowired
    private TokenActionMapper actionMapper;

    @Autowired
    private TokenTypeMapper typeMapper;

    @Autowired
    @Qualifier("sessionRegistry")
    private SessionRegistry sessionRegistry;

    @Override
    public ResponseEntity<MeDto> verifyToken(VerifyTokenDto verifyTokenDto) {
        return ResponseEntity.ok().body(meMapper.toMeDto(userService.verify(
                verifyTokenDto.getCode(),
                typeMapper.toTokenType(verifyTokenDto.getTokenType()),
                actionMapper.toTokenAction(verifyTokenDto.getTokenAction()))));
    }

    @Override
    public ResponseEntity<Void> logout() {
        userService.logout();
        return ResponseEntity.ok().build();
    }
}
