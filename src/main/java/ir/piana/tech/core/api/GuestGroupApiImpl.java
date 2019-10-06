package ir.piana.tech.core.api;

import ir.piana.pianatech.server.api.dto.AgeLevelDto;
import ir.piana.pianatech.server.api.dto.GroupDto;
import ir.piana.pianatech.server.api.service.GuestGroupApi;
import ir.piana.tech.core.enums.AgeLevelType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author Mohamad Rahmati (rahmatii1366@gmail.com)
 * Date: 7/20/2019 11:37 AM
 **/
@RestController
public class GuestGroupApiImpl implements GuestGroupApi {
    @Override
    public ResponseEntity<List<GroupDto>> getGroups(Integer pageSize, Integer pageNumber) {
        return null;
    }

    @Override
    public ResponseEntity<List<AgeLevelDto>> getAgeLevels() {
        List arrayList = Arrays.stream(AgeLevelType.values()).map(ageLevelType -> {
            AgeLevelDto ageLevelDto = new AgeLevelDto();
            ageLevelDto.setTitle(ageLevelType.getFaTitle());
            ageLevelDto.setValue(ageLevelType.toString());
            return ageLevelDto;
        }).collect(Collectors.toList());
//        AllAgeLevelsDto ageLevelDtos = new AllAgeLevelsDto();
//        ageLevelDtos.addAll(arrayList);
//        return ResponseEntity.ok().body(ageLevelDtos);
        return ResponseEntity.ok().body(arrayList);
    }
}
