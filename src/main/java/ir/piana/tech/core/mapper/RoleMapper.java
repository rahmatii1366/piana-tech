package ir.piana.tech.core.mapper;

import ir.piana.tech.api.dto.RoleEnum;
import ir.piana.tech.core.enums.RoleType;
import org.mapstruct.Mapper;
import org.mapstruct.ValueMapping;
import org.mapstruct.ValueMappings;

/**
 * @author Mohamad Rahmati (rahmatii1366@gmail.com)
 * Date: 7/24/2019 8:50 AM
 **/
@Mapper(componentModel = "spring")
public interface RoleMapper {
    RoleEnum toRoleEnum(RoleType roleType);
    RoleType toRoleType(RoleEnum roleEnum);
}
