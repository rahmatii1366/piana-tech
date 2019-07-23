package ir.piana.tech.core.secuity;

import ir.piana.tech.core.enums.RoleType;
import org.springframework.security.core.GrantedAuthority;

/**
 * @author Mohamad Rahmati (rahmatii1366@gmail.com)
 * Date: 7/15/2019 3:53 PM
 **/
public class PianaGrantedAuthority implements GrantedAuthority {
    private String authority;

    public PianaGrantedAuthority(String authority) {
        this.authority = authority;
    }

    public PianaGrantedAuthority(RoleType authority) {
        this.authority = authority.getName();
    }

    @Override
    public String getAuthority() {
        return authority;
    }
}
