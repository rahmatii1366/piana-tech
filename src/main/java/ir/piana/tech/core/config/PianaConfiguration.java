package ir.piana.tech.core.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.joda.JodaModule;
import ir.piana.tech.core.secuity.UnauthorizedAuthenticationEntryPoint;
import org.jasypt.encryption.StringEncryptor;
import org.jasypt.encryption.pbe.StandardPBEStringEncryptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;

/**
 * @author Mohamad Rahmati (rahmatii1366@gmail.com)
 * Date: 7/22/2019 11:06 AM
 **/
@Configuration
@Order(0)
public class PianaConfiguration {
    @Bean
    public ObjectMapper objectMapper() {
        ObjectMapper mapper = new ObjectMapper();
        mapper.registerModule(new JodaModule());
        return mapper;
    }

    @Bean
    public StringEncryptor getStandardPBEStringEncryptor() {
        StandardPBEStringEncryptor s = new StandardPBEStringEncryptor();
        s.setAlgorithm("PBEWithMD5AndTripleDES");
        s.setPassword("hello");
        return s;
    }

    @Bean
    public UnauthorizedAuthenticationEntryPoint unauthorizedAuthenticationEntryPoint(ObjectMapper objectMapper) {
        return new UnauthorizedAuthenticationEntryPoint(objectMapper);
    }
}
