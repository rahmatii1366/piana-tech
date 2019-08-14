package ir.piana.tech.core.api;

import ir.piana.tech.api.dto.*;
import ir.piana.tech.api.service.GuestApiDelegate;
import ir.piana.tech.business.data.service.UserService;
import ir.piana.tech.core.enums.AgeLevelType;
import ir.piana.tech.core.mapper.MeMapper;
import ir.piana.tech.core.mapper.TokenActionMapper;
import ir.piana.tech.core.mapper.TokenTypeMapper;
import ir.piana.tech.core.secuity.PianaAuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

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
    private MeMapper meMapper;

    @Autowired
    private TokenActionMapper actionMapper;

    @Autowired
    private TokenTypeMapper typeMapper;

    @Autowired
    @Qualifier("sessionRegistry")
    private SessionRegistry sessionRegistry;

    @Override
    public ResponseEntity<TokenRequiredDto> signup(SignupDto signupDto) {
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
    public ResponseEntity<AllAgeLevelsDto> getAgeLevels() {
        List arrayList = Arrays.stream(AgeLevelType.values()).map(ageLevelType -> {
            AgeLevelDto ageLevelDto = new AgeLevelDto();
            ageLevelDto.setTitle(ageLevelType.getFaTitle());
            ageLevelDto.setValue(ageLevelType.toString());
            return ageLevelDto;
        }).collect(Collectors.toList());
        AllAgeLevelsDto ageLevelDtos = new AllAgeLevelsDto();
        ageLevelDtos.addAll(arrayList);
        return ResponseEntity.ok().body(ageLevelDtos);
    }

    @Override
    public ResponseEntity<MeDto> verifyToken(VerifyTokenDto verifyTokenDto) {
        return ResponseEntity.ok().body(meMapper.toMeDto(userService.verify(
                verifyTokenDto.getCode(),
                typeMapper.toTokenType(verifyTokenDto.getTokenType()),
                actionMapper.toTokenAction(verifyTokenDto.getTokenAction()))));
    }
}
