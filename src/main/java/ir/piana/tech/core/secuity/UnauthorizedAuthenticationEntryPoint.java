package ir.piana.tech.core.secuity;

import com.fasterxml.jackson.databind.ObjectMapper;
import ir.piana.pianatech.server.api.dto.ErrorDto;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @author Mohamad Rahmati (rahmatii1366@gmail.com)
 * Date: 7/20/2019 11:46 AM
 **/
public class UnauthorizedAuthenticationEntryPoint implements AuthenticationEntryPoint {
    private ObjectMapper mapper;

    public UnauthorizedAuthenticationEntryPoint(ObjectMapper objectMapper) {
        mapper = objectMapper;
    }

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        ErrorDto errorDto = new ErrorDto();
        errorDto.setStatus(HttpStatus.UNAUTHORIZED.toString());
        errorDto.setMessage("session is unauthorized.");
        response.addHeader("Content-Type", "application/json;charset=UTF-8");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.getWriter().write(mapper.writeValueAsString(errorDto));
//        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, mapper.writeValueAsString(errorDto));
    }
}
