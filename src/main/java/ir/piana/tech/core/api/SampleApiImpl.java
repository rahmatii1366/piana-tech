package ir.piana.tech.core.api;

import ir.piana.pianatech.server.api.dto.SampleDto;
import ir.piana.pianatech.server.api.service.SampleApi;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;

/**
 * @author Mohamad Rahmati (rahmatii1366@gmail.com)
 * Date: 7/20/2019 11:37 AM
 **/
@RestController
public class SampleApiImpl implements SampleApi {
    @Autowired
    private HttpSession session;

    @Override
    public ResponseEntity<SampleDto> getSample(Long userId) {
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
