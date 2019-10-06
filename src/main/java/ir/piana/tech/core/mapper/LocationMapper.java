package ir.piana.tech.core.mapper;

import ir.piana.pianatech.server.api.dto.LocationDto;
import ir.piana.pianatech.server.api.dto.RoleEnum;
import ir.piana.pianatech.server.api.dto.ZoneEnum;
import ir.piana.tech.business.enums.ZoneType;
import ir.piana.tech.core.enums.RoleType;
import ir.piana.tech.core.model.LocationModel;
import org.mapstruct.Mapper;

/**
 * @author Mohamad Rahmati (rahmatii1366@gmail.com)
 * Date: 7/24/2019 8:50 AM
 **/
@Mapper(componentModel = "spring")
public interface LocationMapper {
    ZoneEnum toZoneEnum(ZoneType zoneType);
    ZoneType toZoneType(ZoneEnum zoneEnum);
    LocationDto toLocationDto(LocationModel locationModel);
    LocationModel toLocationModel(LocationDto locationDto);
}
