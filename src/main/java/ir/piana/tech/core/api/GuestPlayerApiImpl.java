package ir.piana.tech.core.api;

import ir.piana.pianatech.server.api.dto.*;
import ir.piana.pianatech.server.api.service.GuestPlayerApi;
import ir.piana.tech.business.data.entity.UserInfoEntity;
import ir.piana.tech.business.data.service.PlayerService;
import ir.piana.tech.business.data.service.UserService;
import ir.piana.tech.core.enums.AgeLevelType;
import ir.piana.tech.core.enums.PlayerPositionType;
import ir.piana.tech.core.mapper.LocationMapper;
import ir.piana.tech.core.mapper.PlayerInfoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author Mohamad Rahmati (rahmatii1366@gmail.com)
 * Date: 9/23/2019 2:48 PM
 **/
@RestController
public class GuestPlayerApiImpl implements GuestPlayerApi {
    @Autowired
    private UserService userService;

    @Autowired
    private PlayerService playerService;

    @Autowired
    private LocationMapper locationMapper;

    @Autowired
    private PlayerInfoMapper playerInfoMapper;

    @Override
    public ResponseEntity<List<PlayerProfileDto>> getProfileOfPlayers(Integer pageSize, Integer pageNumber) {
        List<UserInfoEntity> players = playerService.getPlayers(pageSize, pageNumber);
        List<PlayerProfileDto> playerProfileDtoList = playerInfoMapper
                .toPlayerProfileDtoList(players);
        return ResponseEntity.ok().body(playerProfileDtoList);
    }

    @Override
    public ResponseEntity<List<TitleValueDto>> getPositions() {
        List arrayList = Arrays.stream(PlayerPositionType.values()).map(playerPositionType -> {
            TitleValueDto titleValueDto = new TitleValueDto();
            titleValueDto.setTitle(playerPositionType.getFaTitle());
            titleValueDto.setValue(playerPositionType.toString());
            return titleValueDto;
        }).collect(Collectors.toList());
        return ResponseEntity.ok().body(arrayList);
    }
}
