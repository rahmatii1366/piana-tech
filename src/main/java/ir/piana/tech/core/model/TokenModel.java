package ir.piana.tech.core.model;

import ir.piana.tech.business.data.entity.UserEntity;
import ir.piana.tech.core.enums.TokenAction;
import ir.piana.tech.core.enums.TokenType;
import lombok.Builder;
import lombok.Data;

import java.io.Serializable;

/**
 * @author Mohamad Rahmati (rahmatii1366@gmail.com)
 * Date: 8/10/2019 11:22 AM
 **/
@Data
@Builder
public class TokenModel implements Serializable {
    private String mobile;
    private TokenType tokenType;
    private TokenAction tokenAction;
    private String verificationCode;
    private UserEntity related;
}
