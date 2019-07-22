package ir.piana.tech.core.secuity;

import ir.piana.tech.core.enums.RoleType;
import org.springframework.security.core.GrantedAuthority;

/**
 * @author Mohamad Rahmati (rahmatii1366@gmail.com)
 * Date: 7/15/2019 3:53 PM
 **/
public class GrantedAuthorityImpl implements GrantedAuthority {
    private String authority;

    public GrantedAuthorityImpl(String authority) {
        this.authority = authority;
    }

    public GrantedAuthorityImpl(RoleType authority) {
        this.authority = authority.getName();
    }

    @Override
    public String getAuthority() {
        return authority;
    }
}
