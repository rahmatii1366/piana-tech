package ir.piana.tech.core.api;

import ir.piana.pianatech.server.api.service.UserAuthenticationApi;
import ir.piana.tech.business.data.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

/**
 * @author Mohamad Rahmati (rahmatii1366@gmail.com)
 * Date: 7/20/2019 11:37 AM
 **/
//@RestController
public class UserAuthenticationApiImpl implements UserAuthenticationApi {
//    @Autowired
//    private PianaAuthenticationService authenticationService;

    @Autowired
    private UserService userService;

//    @Autowired
//    @Qualifier("sessionRegistry")
//    private SessionRegistry sessionRegistry;

    @Override
    public ResponseEntity<Void> logout() {
        userService.logout();
        return ResponseEntity.ok().build();
    }
}
