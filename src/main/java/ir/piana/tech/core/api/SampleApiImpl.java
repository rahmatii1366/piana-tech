package ir.piana.tech.core.api;

import ir.piana.tech.api.dto.SampleDto;
import ir.piana.tech.api.service.SampleApiDelegate;
import ir.piana.tech.core.enums.RoleType;
import ir.piana.tech.core.enums.RuleType;
import ir.piana.tech.core.secuity.PianaGrantedAuthority;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpSession;
import java.util.Arrays;
import java.util.List;

/**
 * @author Mohamad Rahmati (rahmatii1366@gmail.com)
 * Date: 7/20/2019 11:37 AM
 **/
@Component
public class SampleApiImpl implements SampleApiDelegate {
    @Autowired
    private HttpSession session;

    @Override
    public ResponseEntity<SampleDto> getSample() {
//        session.invalidate();
//        List<PianaGrantedAuthority> authorities = Arrays.asList(new PianaGrantedAuthority(RuleType.VERIFY_EMAIL.getRole()));
//        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
//                "haha", null, authorities);
//        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
//
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        SampleDto sampleDto = new SampleDto();
        sampleDto.setName("sample");
        sampleDto.setMessage("Hello sample!");
        return ResponseEntity.ok().body(sampleDto);
    }

    @Override
    public ResponseEntity<SampleDto> getSampleOne() {
        SampleDto sampleDto = new SampleDto();
        sampleDto.setName("sample one");
        sampleDto.setMessage("Hello one!");
        return ResponseEntity.ok().body(sampleDto);
    }

}
