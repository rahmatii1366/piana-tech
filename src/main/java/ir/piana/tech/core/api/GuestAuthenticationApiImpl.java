package ir.piana.tech.core.api;

import ir.piana.pianatech.server.api.dto.*;
import ir.piana.pianatech.server.api.service.GuestAuthenticationApi;
import ir.piana.tech.business.data.service.UserService;
import ir.piana.tech.core.mapper.MeMapper;
import ir.piana.tech.core.mapper.TokenActionMapper;
import ir.piana.tech.core.mapper.TokenTypeMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import javax.validation.Valid;

/**
 * @author Mohamad Rahmati (rahmatii1366@gmail.com)
 * Date: 7/20/2019 11:37 AM
 **/
//@RestController
public class GuestAuthenticationApiImpl implements GuestAuthenticationApi {
    @Autowired
    private UserService userService;

    @Autowired
    private MeMapper meMapper;

    @Autowired
    private TokenActionMapper actionMapper;

    @Autowired
    private TokenTypeMapper typeMapper;

    @Override
    public ResponseEntity<TokenRequiredDto> signup(@Valid SignupDto signupDto) {
        userService.signup(
                signupDto.getUsername(),
                signupDto.getMobile(),
                signupDto.getPassword());
        TokenRequiredDto tokenRequiredDto = new TokenRequiredDto();
        return ResponseEntity.ok().body(tokenRequiredDto);
    }

    @Override
    public ResponseEntity<MeDto> login(LoginDto loginDto) {
        MeDto meDto = meMapper.toMeDto(userService.login(loginDto.getMobile(), loginDto.getPassword()));
        return ResponseEntity.ok().body(meDto);
    }

    @Override
    public ResponseEntity<TokenRequiredDto> forgetPassword(ForgetPasswordDto forgetPasswordDto) {
        userService.forgetPassword(forgetPasswordDto.getMobile(), forgetPasswordDto.getNewPassword());
        return ResponseEntity.ok().build();
    }

    @Override
    public ResponseEntity<MeDto> verifyToken(VerifyTokenDto verifyTokenDto) {
        return ResponseEntity.ok().body(meMapper.toMeDto(userService.verify(
                verifyTokenDto.getCode(),
                typeMapper.toTokenType(verifyTokenDto.getTokenType()),
                actionMapper.toTokenAction(verifyTokenDto.getTokenAction()))));
    }
}
