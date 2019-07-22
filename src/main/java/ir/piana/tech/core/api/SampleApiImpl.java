package ir.piana.tech.core.api;

import ir.piana.tech.api.dto.SampleDto;
import ir.piana.tech.api.service.SampleApiDelegate;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

/**
 * @author Mohamad Rahmati (rahmatii1366@gmail.com)
 * Date: 7/20/2019 11:37 AM
 **/
@Component
public class SampleApiImpl implements SampleApiDelegate {
    @Override
    public ResponseEntity<SampleDto> getSample() {
        SampleDto sampleDto = new SampleDto();
        sampleDto.setName("User");
        sampleDto.setMessage("Hello User!");
        return ResponseEntity.ok().body(sampleDto);
    }

}
