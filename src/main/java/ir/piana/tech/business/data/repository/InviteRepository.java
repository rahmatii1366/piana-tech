package ir.piana.tech.business.data.repository;

import ir.piana.tech.business.data.entity.GroupEntity;
import ir.piana.tech.business.data.entity.InviteEntity;
import ir.piana.tech.business.data.entity.UserEntity;
import ir.piana.tech.core.enums.AgeLevelType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.Optional;

/**
 * @author Mohamad Rahmati (rahmatii1366@gmail.com)
 * Date: 7/14/2019 2:35 PM
 **/
public interface InviteRepository
        extends PagingAndSortingRepository<InviteEntity, Long>, JpaRepository<InviteEntity, Long> {
    Optional<InviteEntity> findByMobile(String mobile);
}
