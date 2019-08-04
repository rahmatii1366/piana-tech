package ir.piana.tech.api.service;

import org.springframework.stereotype.Controller;
import java.util.Optional;
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2019-08-04T17:46:56.145+04:30")

@Controller
public class GuestApiController implements GuestApi {

    private final GuestApiDelegate delegate;

    @org.springframework.beans.factory.annotation.Autowired
    public GuestApiController(GuestApiDelegate delegate) {
        this.delegate = delegate;
    }

    @Override
    public GuestApiDelegate getDelegate() {
        return delegate;
    }
}
