package ir.piana.tech.core.api;

import ir.piana.pianatech.server.api.dto.*;
import ir.piana.pianatech.server.api.service.UserPlayerApi;
import ir.piana.tech.business.data.service.PlayerService;
import ir.piana.tech.business.data.service.UserService;
import ir.piana.tech.core.mapper.LocationMapper;
import ir.piana.tech.core.mapper.PlayerInfoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

/**
 * @author Mohamad Rahmati (rahmatii1366@gmail.com)
 * Date: 9/23/2019 2:48 PM
 **/
@RestController
public class UserPlayerApiImpl implements UserPlayerApi {
    @Autowired
    private UserService userService;

    @Autowired
    private PlayerService playerService;

    @Autowired
    private LocationMapper locationMapper;

    @Autowired
    private PlayerInfoMapper playerInfoMapper;

    @Override
    public ResponseEntity<Void> uploadPlayerImage(@Valid PlayerImageDto playerImageDto) {
        userService.addUserImage(playerImageDto.getImage(), playerImageDto.getPlayerUsername());
        return ResponseEntity.ok().build();
    }

    @Override
    public ResponseEntity<PlayerInfoDto> getPlayerInfo() {
     return ResponseEntity.ok(playerInfoMapper
             .toPlayerInfoDto(playerService.getPlayerInfo()));
    }

    @Override
    public ResponseEntity<LocationDto> getPlayerLocation() {
        return ResponseEntity.ok(locationMapper
                .toLocationDto(playerService.getUserLocation()));
    }

    @Override
    public ResponseEntity<Void> updatePlayerInfo(@Valid PlayerInfoDto playerInfoDto) {
        playerService.updatePlayerInfo(playerInfoMapper.toPlayerInfoModel(playerInfoDto));
        return ResponseEntity.ok().build();
    }

    @Override
    public ResponseEntity<Void> updatePlayerLocation(@Valid LocationDto locationDto) {
        playerService.updateUserLocation(locationMapper.toLocationModel(locationDto));
        return ResponseEntity.ok().build();
    }

    @Override
    public ResponseEntity<UserInfoDto> getUserInfo() {
        return ResponseEntity.ok(playerInfoMapper
                .toUserInfoDto(playerService.getUserInfo()));
    }

    @Override
    public ResponseEntity<PlayerPositionDto> getPlayerPosition() {
        return ResponseEntity.ok(playerInfoMapper
                .toPlayerPositionDto(playerService.getPlayerPosition()));
    }

    @Override
    public ResponseEntity<Void> updatePlayerPosition(@Valid PlayerPositionDto playerPositionDto) {
        playerService.updatePlayerPosition(playerInfoMapper.toPlayerPositionModel(playerPositionDto));
        return ResponseEntity.ok().build();
    }
}
