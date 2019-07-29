package ir.piana.tech.core.exception;

import ir.piana.tech.api.dto.ErrorDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Mohamad Rahmati (rahmatii1366@gmail.com)
 * Date: 7/22/2019 8:48 AM
 **/
@RestControllerAdvice
@SuppressWarnings("unchecked")
public class PianaExceptionHandler extends ResponseEntityExceptionHandler {
//    @ExceptionHandler(PianaHttpException.class)
//    public final ResponseEntity<ErrorDto> handleAllExceptions(PianaHttpException ex, WebRequest request) {
//        List<String> details = new ArrayList<>();
//        details.add(ex.getLocalizedMessage());
//        ErrorDto error = new ErrorDto();
//        error.setStatus(ex.getHttpStatus().toString());
//        error.setMessage(ex.getMessage());
//        return new ResponseEntity(error, ex.getHttpStatus());
//    }

    @ExceptionHandler(PianaHttpException.class)
    public final ResponseEntity<ErrorDto> handleAllRTExceptions(PianaHttpException ex, WebRequest request) {
        List<String> details = new ArrayList<>();
        details.add(ex.getLocalizedMessage());
        ErrorDto error = new ErrorDto();
        error.setStatus(ex.getHttpStatus().toString());
        error.setMessage(ex.getMessage());
        return new ResponseEntity(error, ex.getHttpStatus());
    }
}
