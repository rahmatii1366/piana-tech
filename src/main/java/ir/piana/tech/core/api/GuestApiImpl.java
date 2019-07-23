package ir.piana.tech.core.api;

import ir.piana.tech.api.dto.LoginDto;
import ir.piana.tech.api.dto.MeDto;
import ir.piana.tech.api.dto.SignupDto;
import ir.piana.tech.api.service.GuestApiDelegate;
import ir.piana.tech.business.data.service.UserService;
import ir.piana.tech.core.secuity.PianaAuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.io.IOException;

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

    public ResponseEntity<MeDto> login(LoginDto loginDto) {
        MeDto meDto = authenticationService.login(loginDto.getEmail(), loginDto.getPassword());
        return ResponseEntity.ok().body(meDto);
    }

    @Override
    public ResponseEntity<MeDto> signUp(SignupDto argument) {
        MeDto meDto = userService.signup(argument.getEmail(), argument.getPassword());
        return ResponseEntity.ok().body(meDto);
    }

    @Override
    public ResponseEntity<MeDto> signUpVerify(String  link) {
        MeDto meDto = userService.verify(link);
//        if(getObjectMapper().isPresent() && getAcceptHeader().isPresent()) {
//            if (getAcceptHeader().get().contains("application/json")) {
//                try {
//                    return new ResponseEntity<>(getObjectMapper().get().readValue("{  \"role\" : { },  \"email\" : \"email\"}", MeDto.class), HttpStatus.NOT_IMPLEMENTED);
//                } catch (IOException e) {
//                    log.error("Couldn't serialize response for content type application/json", e);
//                    return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//                }
//            }
//        } else {
//            log.warn("ObjectMapper or HttpServletRequest not configured in default GuestApi interface so no example is generated");
//        }
        return ResponseEntity.ok().body(meDto);
    }
}
