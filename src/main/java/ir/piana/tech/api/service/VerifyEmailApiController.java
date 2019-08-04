package ir.piana.tech.api.service;

import org.springframework.stereotype.Controller;
import java.util.Optional;
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2019-08-04T17:46:56.145+04:30")

@Controller
public class VerifyEmailApiController implements VerifyEmailApi {

    private final VerifyEmailApiDelegate delegate;

    @org.springframework.beans.factory.annotation.Autowired
    public VerifyEmailApiController(VerifyEmailApiDelegate delegate) {
        this.delegate = delegate;
    }

    @Override
    public VerifyEmailApiDelegate getDelegate() {
        return delegate;
    }
}
