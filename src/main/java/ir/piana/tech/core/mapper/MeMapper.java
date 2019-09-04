package ir.piana.tech.core.mapper;

import ir.piana.pianatech.server.api.dto.MeDto;
import ir.piana.tech.core.model.MeModel;
import org.mapstruct.Mapper;

/**
 * @author Mohamad Rahmati (rahmatii1366@gmail.com)
 * Date: 7/24/2019 8:50 AM
 **/
@Mapper(componentModel = "spring")
public interface MeMapper {
    MeDto toMeDto(MeModel meModel);
    MeModel toMeModel(MeDto meDto);
}
