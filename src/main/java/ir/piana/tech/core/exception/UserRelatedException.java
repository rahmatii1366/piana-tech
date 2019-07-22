package ir.piana.tech.core.exception;

import org.springframework.http.HttpStatus;

/**
 * @author Mohamad Rahmati (rahmatii1366@gmail.com)
 * Date: 7/22/2019 8:41 AM
 **/
public class UserRelatedException extends PianaHttpException {
    public UserRelatedException(String message) {
        super(message, HttpStatus.BAD_REQUEST);
    }
}
