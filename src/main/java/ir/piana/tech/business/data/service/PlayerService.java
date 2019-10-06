package ir.piana.tech.business.data.service;

import ir.piana.tech.business.data.entity.UserEntity;
import ir.piana.tech.business.data.entity.UserInfoEntity;
import ir.piana.tech.business.data.repository.UserInfoRepository;
import ir.piana.tech.business.data.repository.UserRepository;
import ir.piana.tech.core.exception.ServerRelatedException;
import ir.piana.tech.core.exception.UserRelatedException;
import ir.piana.tech.core.model.LocationModel;
import ir.piana.tech.core.model.MeModel;
import ir.piana.tech.core.model.PlayerInfoModel;
import ir.piana.tech.core.model.PlayerPositionModel;
import ir.piana.tech.core.secuity.PianaAuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * @author Mohamad Rahmati (rahmatii1366@gmail.com)
 * Date: 9/24/2019 2:18 PM
 **/
@Service
public class PlayerService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserInfoRepository userInfoRepository;

    @Autowired
    private PianaAuthenticationService authenticationService;

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void updateUserLocation(LocationModel locationModel) {
        UserEntity userEntity = authenticationService.getUserEntity();
        userEntity.getUserInfoEntity().setZoneType(locationModel.getZoneType());
        userEntity.getUserInfoEntity().setAbbreviatedCity(locationModel.getAbbr());
        userRepository.save(userEntity);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public LocationModel getUserLocation() {
        UserEntity userEntity = authenticationService.getUserEntity();
        return LocationModel.builder()
                .abbr(userEntity.getUserInfoEntity().getAbbreviatedCity())
                .zoneType(userEntity.getUserInfoEntity().getZoneType()).build();
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void updatePlayerInfo(
            PlayerInfoModel playerInfoModel) {
        UserEntity userEntity = authenticationService.getUserEntity();
        Optional<UserInfoEntity> byId = userInfoRepository.findById(userEntity.getId());
        UserInfoEntity userInfoEntity = byId.orElseThrow(() -> new ServerRelatedException("user info not exist!"));
        userInfoEntity.setFirstName(playerInfoModel.getFirstName());
        userInfoEntity.setLastName(playerInfoModel.getLastName());
        userInfoEntity.setNationalCode(playerInfoModel.getNationalCode());
        userInfoRepository.save(userInfoEntity);
        userEntity.setUserInfoEntity(userInfoEntity);
        authenticationService.authenticateMe(userEntity);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public PlayerInfoModel getPlayerInfo() {
        UserEntity userEntity = authenticationService.getUserEntity();
        return PlayerInfoModel.builder()
                .firstName(userEntity.getUserInfoEntity().getFirstName())
                .lastName(userEntity.getUserInfoEntity().getLastName())
                .nationalCode(userEntity.getUserInfoEntity().getNationalCode())
                .build();
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public PlayerPositionModel getPlayerPosition() {
        UserEntity userEntity = authenticationService.getUserEntity();
        return PlayerPositionModel.builder()
                .position(userEntity.getUserInfoEntity().getPositionType())
                .build();
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void updatePlayerPosition(
            PlayerPositionModel playerPositionModel) {
        UserEntity userEntity = authenticationService.getUserEntity();
        userEntity.getUserInfoEntity().setPositionType(playerPositionModel.getPosition());
        userEntity = userRepository.save(userEntity);
        authenticationService.authenticateMe(userEntity);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public UserInfoEntity getUserInfo() {
        return authenticationService.getUserEntity().getUserInfoEntity();
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public List<UserInfoEntity> getPlayers(Integer pageSize, Integer pageNumber) {
//        MeModel meModel = authenticationService.getMeModel();
        Page<UserInfoEntity> all = userInfoRepository.findAll(PageRequest.of(pageNumber, pageSize));
        return all.getContent();
    }
}
