package ir.piana.tech.core.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import ir.piana.pianatech.server.api.dto.ZoneEnum;
import ir.piana.tech.business.enums.ZoneType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author Mohamad Rahmati (rahmatii1366@gmail.com)
 * Date: 8/21/2019 11:46 AM
 **/
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LocationModel {
    private String abbr;
    private ZoneType zoneType;
}
