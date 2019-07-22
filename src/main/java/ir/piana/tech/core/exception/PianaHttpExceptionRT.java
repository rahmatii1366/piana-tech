package ir.piana.tech.core.exception;

import org.springframework.http.HttpStatus;

/**
 * @author Mohamad Rahmati (rahmatii1366@gmail.com)
 * Date: 7/22/2019 8:41 AM
 **/
public class PianaHttpExceptionRT extends RuntimeException {
    private HttpStatus httpStatus;

    public PianaHttpExceptionRT(HttpStatus httpStatus) {
        this("Unknown exception!", httpStatus);
    }

    public PianaHttpExceptionRT(String message, HttpStatus httpStatus) {
        super(message);
        this.httpStatus = httpStatus;
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }
}
