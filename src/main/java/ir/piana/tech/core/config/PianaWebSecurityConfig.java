package ir.piana.tech.core.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.joda.JodaModule;
import ir.piana.tech.core.enums.RoleType;
import ir.piana.tech.core.secuity.UnauthorizedAuthenticationEntryPoint;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;

/**
 * @author Mohamad Rahmati (rahmatii1366@gmail.com)
 * Date: 7/20/2019 11:40 AM
 **/
@EnableWebSecurity
public class PianaWebSecurityConfig {
    @Configuration
    @Order(2)
    public static class CustomWebSecurityConfigurerAdapterA extends WebSecurityConfigurerAdapter {
        @Autowired
        private UnauthorizedAuthenticationEntryPoint entryPoint;

        @Override
        protected void configure(HttpSecurity http) throws Exception {
            http.antMatcher("/sample/**").authorizeRequests()
                    .antMatchers("/sample/one").permitAll()
                    .anyRequest().authenticated()
                    .and().sessionManagement()
                    .sessionCreationPolicy(SessionCreationPolicy.ALWAYS)
                    .and()
                    .csrf().disable()
                    .formLogin().disable()
                    .httpBasic().disable()
                    .exceptionHandling().authenticationEntryPoint(entryPoint);
        }
    }

    @Configuration
    @Order(2)
    public static class CustomWebSecurityConfigurerAdapterB extends WebSecurityConfigurerAdapter {
        @Autowired
        private UnauthorizedAuthenticationEntryPoint entryPoint;

        @Override
        protected void configure(HttpSecurity http) throws Exception {
            http.antMatcher("/guest/**").authorizeRequests()
                    .anyRequest().permitAll()
                    .and().sessionManagement()
                    .sessionCreationPolicy(SessionCreationPolicy.ALWAYS)
                    .and()
                    .csrf().disable()
                    .formLogin().disable()
                    .httpBasic().disable()
                    .exceptionHandling().authenticationEntryPoint(entryPoint);
        }
    }

    @Configuration
    @Order(3)
    public static class CustomWebSecurityConfigurerAdapterC extends WebSecurityConfigurerAdapter {
        @Autowired
        private UnauthorizedAuthenticationEntryPoint entryPoint;

        @Override
        protected void configure(HttpSecurity http) throws Exception {
            http.antMatcher("/user/**").authorizeRequests().anyRequest().permitAll()
                    .and().sessionManagement()
                    .sessionCreationPolicy(SessionCreationPolicy.ALWAYS)
                    .and()
                    .csrf().disable()
                    .formLogin().disable()
                    .httpBasic().disable()
                    .exceptionHandling().authenticationEntryPoint(entryPoint);
        }
    }
}
