package ir.piana.tech.business.data.repository;

import ir.piana.tech.business.data.entity.MobileEntity;
import ir.piana.tech.business.data.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.Optional;

/**
 * @author Mohamad Rahmati (rahmatii1366@gmail.com)
 * Date: 7/14/2019 2:35 PM
 **/
public interface MobileRepository
        extends PagingAndSortingRepository<MobileEntity, Long>, JpaRepository<MobileEntity, Long> {
    Optional<MobileEntity> findByMobile(String mobile);
}
