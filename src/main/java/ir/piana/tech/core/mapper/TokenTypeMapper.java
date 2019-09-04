package ir.piana.tech.core.mapper;

import ir.piana.pianatech.server.api.dto.TokenTypeEnum;
import ir.piana.tech.core.enums.TokenType;
import org.mapstruct.Mapper;

/**
 * @author Mohamad Rahmati (rahmatii1366@gmail.com)
 * Date: 7/24/2019 8:50 AM
 **/
@Mapper(componentModel = "spring")
public interface TokenTypeMapper {
    TokenTypeEnum toTokenTypeEnum(TokenType tokenType);
    TokenType toTokenType(TokenTypeEnum tokenTypeEnum);
}
