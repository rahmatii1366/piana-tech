package ir.piana.tech.core.mapper;

import ir.piana.tech.api.dto.RoleEnum;
import ir.piana.tech.api.dto.RuleEnum;
import ir.piana.tech.core.enums.RoleType;
import ir.piana.tech.core.enums.RuleType;
import org.mapstruct.Mapper;

/**
 * @author Mohamad Rahmati (rahmatii1366@gmail.com)
 * Date: 7/24/2019 8:50 AM
 **/
@Mapper(componentModel = "spring")
public interface RuleMapper {
    RuleEnum toRuleEnum(RuleType ruleType);
    RuleType toRuleType(RuleEnum ruleEnum);
}
