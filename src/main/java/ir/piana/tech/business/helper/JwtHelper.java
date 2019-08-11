package ir.piana.tech.business.helper;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import ir.piana.tech.business.data.entity.UserEntity;
import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

/**
 * @author Mohamad Rahmati (rahmatii1366@gmail.com)
 * Date: 7/15/2019 10:41 AM
 **/
@Component
public class JwtHelper {
    @Value("${piana.user.jwt.issuer:piana.herokuapp.com}")
    private String issuer;

    @Value("${piana.user.jwt.secret:secret}")
    private String secret;

    private Algorithm algorithm;

    @PostConstruct
    public void init() {
         algorithm = Algorithm.HMAC256(secret);
    }

    public String createJwtToken(UserEntity userEntity) {
        return JWT.create()
                .withSubject(userEntity.getMobile())
                .withClaim("type", "USER")
                .withClaim("email", userEntity.getEmail())
                .withIssuer(issuer)
                .withIssuedAt(DateTime.now().toDate())
                .sign(algorithm);
    }
}
