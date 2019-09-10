package ir.piana.tech.core.api;

import ir.piana.pianatech.server.api.dto.MeDto;
import ir.piana.pianatech.server.api.service.UserAuthenticationApi;
import ir.piana.tech.business.data.service.UserService;
import ir.piana.tech.core.mapper.MeMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author Mohamad Rahmati (rahmatii1366@gmail.com)
 * Date: 7/20/2019 11:37 AM
 **/
@RestController
public class UserAuthenticationApiImpl implements UserAuthenticationApi {
//    @Autowired
//    private PianaAuthenticationService authenticationService;

    @Autowired
    private UserService userService;

    @Autowired
    private MeMapper meMapper;

//    @Autowired
//    @Qualifier("sessionRegistry")
//    private SessionRegistry sessionRegistry;

    @Override
    public ResponseEntity<MeDto> howMe() {
        MeDto meDto = meMapper.toMeDto(userService.howMe());
        return ResponseEntity.ok().body(meDto);
    }

    @Override
    public ResponseEntity<Void> logout() {
        userService.logout();
        return ResponseEntity.ok().build();
    }
}
