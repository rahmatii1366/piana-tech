package ir.piana.tech.core.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import ir.piana.tech.core.enums.RoleType;
import ir.piana.tech.core.enums.RuleType;
import lombok.Builder;
import lombok.Data;

/**
 * @author Mohamad Rahmati (rahmatii1366@gmail.com)
 * Date: 7/24/2019 9:04 AM
 **/
@Data
@Builder
public class MeModel {
    @JsonProperty("username")
    private String username = null;

    @JsonProperty("email")
    private String email = null;

    @JsonProperty("mobile")
    private String mobile = null;

    @JsonProperty("role")
    private RoleType role = null;

    @JsonProperty("rule")
    private RuleType rule = null;
}
