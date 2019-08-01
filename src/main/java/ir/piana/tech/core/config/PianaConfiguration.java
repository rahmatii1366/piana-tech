package ir.piana.tech.core.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.joda.JodaModule;
import ir.piana.tech.core.secuity.UnauthorizedAuthenticationEntryPoint;
import ir.piana.tech.core.util.PianaDigester;
import org.jasypt.digest.StandardStringDigester;
import org.jasypt.digest.StringDigester;
import org.jasypt.encryption.StringEncryptor;
import org.jasypt.encryption.pbe.StandardPBEStringEncryptor;
import org.jasypt.salt.IVGenerator;
import org.jasypt.salt.SaltGenerator;
import org.jasypt.salt.StringFixedIVGenerator;
import org.jasypt.salt.StringFixedSaltGenerator;
import org.jasypt.util.digest.Digester;
import org.springframework.boot.web.servlet.ServletListenerRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.core.session.SessionRegistryImpl;
import org.springframework.security.web.session.HttpSessionEventPublisher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;

import java.nio.charset.Charset;
import java.util.Arrays;
import java.util.Random;

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
    public Random random() {
        return new Random();
    }

    @Bean
    public StringEncryptor getStandardPBEStringEncryptor() {
        StandardPBEStringEncryptor s = new StandardPBEStringEncryptor();
        s.setAlgorithm("PBEWithMD5AndTripleDES");
        s.setPassword("hello");
        return s;
    }

    @Bean
    public PianaDigester getPianaDigester() {
        Digester s = new Digester();
        return new PianaDigester(s);
    }

    @Bean
    public UnauthorizedAuthenticationEntryPoint unauthorizedAuthenticationEntryPoint(ObjectMapper objectMapper) {
        return new UnauthorizedAuthenticationEntryPoint(objectMapper);
    }

//    @Bean
//    public Config hazelCastConfig() {
//
//        Config config = new Config();
//        config.setInstanceName("hazelcast-cache");
//
//        MapConfig allUsersCache = new MapConfig();
//        allUsersCache.setTimeToLiveSeconds(20);
//        allUsersCache.setEvictionPolicy(EvictionPolicy.LFU);
//        config.getMapConfigs().put("alluserscache", allUsersCache);
//
//        MapConfig usercache = new MapConfig();
//        usercache.setTimeToLiveSeconds(20);
//        usercache.setEvictionPolicy(EvictionPolicy.LFU);
//        config.getMapConfigs().put("usercache",usercache);
//
//        return config;
//    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost", "http://localhost:80"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "OPTIONS", "DELETE"));
        configuration.setAllowedHeaders(Arrays.asList("authorization", "content-type", "xsrf-token", "cookie", "set-cookie"));
//        configuration.setExposedHeaders(Arrays.asList("authorization", "content-type", "xsrf-token", "cookie", "set-cookie"));
        configuration.setAllowCredentials(true);
        configuration.setMaxAge(3600l);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    SessionRegistry sessionRegistry() {
        return new SessionRegistryImpl();
    }

    @Bean
    public static ServletListenerRegistrationBean httpSessionEventPublisher() {	//(5)
        return new ServletListenerRegistrationBean(new HttpSessionEventPublisher());
    }
}
