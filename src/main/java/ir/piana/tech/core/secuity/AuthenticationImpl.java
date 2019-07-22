package ir.piana.tech.core.secuity;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

/**
 * @author Mohamad Rahmati (rahmatii1366@gmail.com)
 * Date: 7/15/2019 3:52 PM
 **/
public class AuthenticationImpl
        extends UsernamePasswordAuthenticationToken {
//    private List<GrantedAuthorityImpl> authorities;
//    private UserEntity userEntity;
//    private String uuid;

    public AuthenticationImpl(Object principal, Object credentials) {
        super(principal, credentials);
    }

    public AuthenticationImpl(Object principal, Object credentials, Collection<? extends GrantedAuthority> authorities) {
        super(principal, credentials, authorities);
    }

//    @Override
//    public Collection<GrantedAuthority> getAuthorities() {
//        return authorities;
//    }

//    @Override
//    public Object getCredentials() {
//        return uuid;
//    }
//
//    @Override
//    public Object getDetails() {
//        return null;
//    }
//
//    @Override
//    public Object getPrincipal() {
//        return userEntity;
//    }
//
//    @Override
//    public boolean isAuthenticated() {
//        return true;
//    }
//
//    @Override
//    public void setAuthenticated(boolean isAuthenticated) throws IllegalArgumentException {
//
//    }
//
//    @Override
//    public String getName() {
//        return userEntity.getEmail();
//    }
}
