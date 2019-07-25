package ir.piana.tech.core.api;

import ir.piana.tech.api.dto.LoginDto;
import ir.piana.tech.api.dto.MeDto;
import ir.piana.tech.api.dto.SignupDto;
import ir.piana.tech.api.dto.VerifyCodeDto;
import ir.piana.tech.api.service.GuestApiDelegate;
import ir.piana.tech.api.service.VerifyEmailApiDelegate;
import ir.piana.tech.business.data.service.UserService;
import ir.piana.tech.core.mapper.MeMapper;
import ir.piana.tech.core.secuity.PianaAuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

/**
 * @author Mohamad Rahmati (rahmatii1366@gmail.com)
 * Date: 7/20/2019 11:37 AM
 **/
@Component
public class VerifyEmailApiImpl implements VerifyEmailApiDelegate {
    @Autowired
    private PianaAuthenticationService authenticationService;

    @Autowired
    private UserService userService;

    @Autowired
    private MeMapper meMapper;

    @Override
    public ResponseEntity<MeDto> signUpVerify(VerifyCodeDto codeDto) {
        MeDto meDto = meMapper.toMeDto(userService.verify(codeDto.getCode()));
        return ResponseEntity.ok().body(meDto);
    }
}
