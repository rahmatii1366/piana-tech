package ir.piana.tech.business.data.repository;

import ir.piana.tech.business.data.entity.UserEntity;
import ir.piana.tech.business.data.entity.UserInfoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.Optional;

/**
 * @author Mohamad Rahmati (rahmatii1366@gmail.com)
 * Date: 7/14/2019 2:35 PM
 **/
public interface UserInfoRepository
        extends PagingAndSortingRepository<UserInfoEntity, Long>, JpaRepository<UserInfoEntity, Long> {
    Optional<UserInfoEntity> findById(Long id);
    Optional<UserInfoEntity> findByUsername(String username);
}
