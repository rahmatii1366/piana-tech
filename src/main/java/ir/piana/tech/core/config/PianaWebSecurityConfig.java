package ir.piana.tech.core.config;


import ir.piana.tech.core.enums.RuleType;
import ir.piana.tech.core.secuity.UnauthorizedAuthenticationEntryPoint;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.*;

import java.util.Arrays;

/**
 * @author Mohamad Rahmati (rahmatii1366@gmail.com)
 * Date: 7/20/2019 11:40 AM
 **/
//@EnableWebSecurity
public class PianaWebSecurityConfig /*implements WebMvcConfigurer */{
//    @Configuration
//    @Order(2)
    public static class CustomWebSecurityConfigurerAdapterA extends WebSecurityConfigurerAdapter {
        @Autowired
        private UnauthorizedAuthenticationEntryPoint entryPoint;

        @Override
        protected void configure(HttpSecurity http) throws Exception {
            http.antMatcher("/sample/**").authorizeRequests()
                    .antMatchers("/sample/one").hasRole("USER")
                    .anyRequest().permitAll()
                    .and().sessionManagement()
                    .sessionCreationPolicy(SessionCreationPolicy.ALWAYS)
                    .and()
                    .cors().and()
                    .csrf().disable()
                    .formLogin().disable()
                    .httpBasic().disable()
                    .exceptionHandling().authenticationEntryPoint(entryPoint);
        }
    }

//    @Configuration
//    @Order(3)
    public static class CustomWebSecurityConfigurerAdapterB extends WebSecurityConfigurerAdapter {
        @Autowired
        private UnauthorizedAuthenticationEntryPoint entryPoint;

        @Autowired
        @Qualifier("sessionRegistry")
        private SessionRegistry sessionRegistry;

        @Override
        protected void configure(HttpSecurity http) throws Exception {
            http.antMatcher("/guest/**").authorizeRequests()
                    .anyRequest().permitAll()
                    .and().sessionManagement()
                    .maximumSessions(100_000).sessionRegistry(sessionRegistry)
                    .and()
                    .sessionCreationPolicy(SessionCreationPolicy.ALWAYS)
                    .and()
                    .cors().and()
                    .csrf().disable()
                    .formLogin().disable()
                    .httpBasic().disable()
                    .exceptionHandling().authenticationEntryPoint(entryPoint);
        }
    }

//    @Configuration
//    @Order(4)
    public static class CustomWebSecurityConfigurerAdapterC extends WebSecurityConfigurerAdapter {
        @Autowired
        private UnauthorizedAuthenticationEntryPoint entryPoint;

        @Override
        protected void configure(HttpSecurity http) throws Exception {
            http.antMatcher("/verify-email/**").authorizeRequests()
                    .anyRequest().hasRole(RuleType.VERIFY_EMAIL.getName())
                    .and().sessionManagement()
                    .sessionCreationPolicy(SessionCreationPolicy.ALWAYS)
                    .and()
                    .cors().and()
                    .csrf().disable()
                    .formLogin().disable()
                    .httpBasic().disable()
                    .exceptionHandling().authenticationEntryPoint(entryPoint);
        }
    }

//    @Configuration
//    @Order(5)
    public static class CustomWebSecurityConfigurerAdapterD extends WebSecurityConfigurerAdapter {
        @Autowired
        private UnauthorizedAuthenticationEntryPoint entryPoint;

        @Override
        protected void configure(HttpSecurity http) throws Exception {
            http.antMatcher("/user/**").authorizeRequests().anyRequest().permitAll()
                    .and().sessionManagement()
                    .sessionCreationPolicy(SessionCreationPolicy.ALWAYS)
                    .and()
                    .cors().and()
                    .csrf().disable()
                    .formLogin().disable()
                    .httpBasic().disable()
                    .exceptionHandling().authenticationEntryPoint(entryPoint);
        }
    }

//    @Configuration
//    @Order(6)
    public static class CustomWebSecurityConfigurerAdapterE extends WebSecurityConfigurerAdapter {
        @Autowired
        private UnauthorizedAuthenticationEntryPoint entryPoint;

        @Override
        protected void configure(HttpSecurity http) throws Exception {
            http.antMatcher("/template/**").authorizeRequests().anyRequest().permitAll()
                    .and().sessionManagement()
                    .sessionCreationPolicy(SessionCreationPolicy.ALWAYS)
                    .and()
                    .cors().and()
                    .csrf().disable()
                    .formLogin().disable()
                    .httpBasic().disable()
                    .exceptionHandling().authenticationEntryPoint(entryPoint);
        }
    }

//    @Configuration
//    @Order(7)
    public static class CustomWebSecurityConfigurerAdapterF extends WebSecurityConfigurerAdapter {
        @Autowired
        private UnauthorizedAuthenticationEntryPoint entryPoint;

        @Override
        protected void configure(HttpSecurity http) throws Exception {
            http.antMatcher("/static/**").authorizeRequests().anyRequest().permitAll()
                    .and().sessionManagement()
                    .sessionCreationPolicy(SessionCreationPolicy.ALWAYS)
                    .and()
                    .cors().and()
                    .csrf().disable()
                    .formLogin().disable()
                    .httpBasic().disable()
                    .exceptionHandling().authenticationEntryPoint(entryPoint);
        }
    }

//    @Configuration
//    @Order(8)
    public static class CustomWebSecurityConfigurerAdapterG extends WebSecurityConfigurerAdapter {
        @Autowired
        private UnauthorizedAuthenticationEntryPoint entryPoint;

        @Override
        protected void configure(HttpSecurity http) throws Exception {
            http.antMatcher("/auth/**").authorizeRequests().anyRequest().permitAll()
                    .and().sessionManagement()
                    .sessionCreationPolicy(SessionCreationPolicy.ALWAYS)
                    .and()
                    .cors().and()
                    .csrf().disable()
                    .formLogin().disable()
                    .httpBasic().disable()
                    .exceptionHandling().authenticationEntryPoint(entryPoint);
        }
    }

//    @Configuration
    public class WebConfig implements WebMvcConfigurer {
//        @Override
//        public void addCorsMappings(CorsRegistry registry) {
//            registry.addMapping("/**")
//                    .allowedOrigins("http://localhost")
//                    .allowedMethods("GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS")
//                    .maxAge(3600)
//                    .allowedHeaders("authorization, content-type, xsrf-token, cookie, set-cookie")
//                    .allowCredentials(true)
//            ;
//        }

        @Override
        public void addResourceHandlers(ResourceHandlerRegistry registry) {
            registry.addResourceHandler(
                    "/**")
                    .addResourceLocations(
                            "classpath:/public/");
        }
    }
}
