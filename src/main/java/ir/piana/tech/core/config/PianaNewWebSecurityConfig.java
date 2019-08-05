package ir.piana.tech.core.config;


import ir.piana.tech.core.secuity.UnauthorizedAuthenticationEntryPoint;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.web.session.HttpSessionEventPublisher;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * @author Mohamad Rahmati (rahmatii1366@gmail.com)
 * Date: 7/20/2019 11:40 AM
 **/
@EnableWebSecurity
@Configuration
public class PianaNewWebSecurityConfig
        extends WebSecurityConfigurerAdapter
        implements WebMvcConfigurer {

    @Autowired
    private UnauthorizedAuthenticationEntryPoint entryPoint;

    @Autowired
    @Qualifier("sessionRegistry")
    private SessionRegistry sessionRegistry;


    @Bean
    public HttpSessionEventPublisher httpSessionEventPublisher() {
        return new HttpSessionEventPublisher();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.antMatcher("/guest/**").authorizeRequests()
                .anyRequest().permitAll();
        http.sessionManagement()
                .maximumSessions(10)
                .maxSessionsPreventsLogin(false)
                .sessionRegistry(sessionRegistry)
                .and()
//                .sessionCreationPolicy(SessionCreationPolicy.ALWAYS)
                .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
                .and()
                .cors().and()
                .csrf().disable()
                .formLogin().disable()
                .httpBasic().disable()
                .exceptionHandling().authenticationEntryPoint(entryPoint);
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler(
                "/**")
                .addResourceLocations(
                        "classpath:/public/");
    }
}
