package ir.piana.tech.core.api;

import ir.piana.tech.api.dto.*;
import ir.piana.tech.api.service.GuestApiDelegate;
import ir.piana.tech.business.data.entity.UserEntity;
import ir.piana.tech.business.data.service.MobileService;
import ir.piana.tech.business.data.service.UserService;
import ir.piana.tech.core.exception.UserRelatedException;
import ir.piana.tech.core.mapper.MeMapper;
import ir.piana.tech.core.secuity.PianaAuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.stereotype.Component;

/**
 * @author Mohamad Rahmati (rahmatii1366@gmail.com)
 * Date: 7/20/2019 11:37 AM
 **/
@Component
public class GuestApiImpl implements GuestApiDelegate {
    @Autowired
    private PianaAuthenticationService authenticationService;

    @Autowired
    private UserService userService;

    @Autowired
    private MobileService mobileService;

    @Autowired
    private MeMapper meMapper;

    @Autowired
    @Qualifier("sessionRegistry")
    private SessionRegistry sessionRegistry;

    public ResponseEntity<MeDto> login(LoginDto loginDto) {
        sessionRegistry.getAllPrincipals().forEach(p -> {
            if(((UserEntity)((UsernamePasswordAuthenticationToken)p).getPrincipal()).getEmail().equalsIgnoreCase(loginDto.getEmail()))
                throw new UserRelatedException("duplicate email");
        });
        MeDto meDto = meMapper.toMeDto(userService.login(
                loginDto.getEmail(), loginDto.getPassword()));
        return ResponseEntity.ok().body(meDto);
    }

    @Override
    public ResponseEntity<MeDto> signUp(SignupDto argument) {
        MeDto meDto = meMapper.toMeDto(
                userService.signup(argument.getEmail(), argument.getPassword()));
        return ResponseEntity.ok().body(meDto);
    }

    @Override
    public ResponseEntity<VerifyCodeDto> mobileForgetPassword(ForgetPasswordDto loginDto) {
        return null;
    }

    @Override
    public ResponseEntity<MeDto> mobileLogin(MobileLoginDto loginDto) {
        MeDto meDto = meMapper.toMeDto(mobileService.login(loginDto.getMobile(), loginDto.getPassword()));
        return ResponseEntity.ok().body(meDto);
    }

    @Override
    public ResponseEntity<MeDto> mobileSignup(MobileSignupDto signupDto) {
        MeDto meDto = meMapper.toMeDto(mobileService.signup(
                signupDto.getUsername(),
                signupDto.getMobile(),
                signupDto.getEmail(),
                signupDto.getPassword()));
        return ResponseEntity.ok().body(meDto);
    }

    @Override
    public ResponseEntity<MeDto> mobileVerify() {
        return null;
    }
}
