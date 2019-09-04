package ir.piana.tech.core.exception;


import ir.piana.pianatech.server.api.dto.ErrorDto;
import ir.piana.pianatech.server.api.dto.TokenRequiredDto;
import ir.piana.tech.core.mapper.TokenActionMapper;
import ir.piana.tech.core.mapper.TokenTypeMapper;
import org.springframework.beans.factory.annotation.Autowired;
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
    @Autowired
    TokenActionMapper actionMapper;

    @Autowired
    TokenTypeMapper typeMapper;

    @ExceptionHandler(TokenRelatedException.class)
    public final ResponseEntity<TokenRequiredDto> handleTokenRelatedException(TokenRelatedException ex, WebRequest request) {
        List<String> details = new ArrayList<>();
        details.add(ex.getLocalizedMessage());
        TokenRequiredDto tokenRequiredDto = new TokenRequiredDto();
        tokenRequiredDto.setTokenAction(actionMapper.toTokenActionEnum(ex.getTokenModel().getTokenAction()));
        tokenRequiredDto.setTokenType(typeMapper.toTokenTypeEnum(ex.getTokenModel().getTokenType()));
        tokenRequiredDto.setMessage(ex.getMessage());
        return new ResponseEntity(tokenRequiredDto, ex.getHttpStatus());
    }

    @ExceptionHandler(PianaHttpException.class)
    public final ResponseEntity<ErrorDto> handlePianaHttpExceptions(PianaHttpException ex, WebRequest request) {
        List<String> details = new ArrayList<>();
        details.add(ex.getLocalizedMessage());
        ErrorDto error = new ErrorDto();
        error.setStatus(ex.getHttpStatus().toString());
        error.setMessage(ex.getMessage());
        return new ResponseEntity(error, ex.getHttpStatus());
    }
}
