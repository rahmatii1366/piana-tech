package ir.piana.tech.core.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.joda.JodaModule;
import com.hazelcast.config.Config;
import com.hazelcast.config.EvictionPolicy;
import com.hazelcast.config.MapConfig;
import ir.piana.tech.core.secuity.UnauthorizedAuthenticationEntryPoint;
import org.jasypt.encryption.StringEncryptor;
import org.jasypt.encryption.pbe.StandardPBEStringEncryptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;

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
}
