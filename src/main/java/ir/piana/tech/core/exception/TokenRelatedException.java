package ir.piana.tech.core.exception;

import ir.piana.tech.core.enums.TokenAction;
import ir.piana.tech.core.enums.TokenType;
import ir.piana.tech.core.model.TokenModel;
import lombok.Data;
import org.springframework.http.HttpStatus;

/**
 * @author Mohamad Rahmati (rahmatii1366@gmail.com)
 * Date: 7/22/2019 8:41 AM
 **/
@Data
public class TokenRelatedException extends RuntimeException {
    private final HttpStatus httpStatus = HttpStatus.ACCEPTED;
    private final TokenModel tokenModel;

    public TokenRelatedException(
            TokenModel tokenModel,
            String message) {
        super(message);
        this.tokenModel = tokenModel;
    }
}
