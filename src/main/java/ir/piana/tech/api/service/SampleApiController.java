package ir.piana.tech.api.service;

import org.springframework.stereotype.Controller;
import java.util.Optional;
@javax.annotation.Generated(value = "io.swagger.codegen.languages.SpringCodegen", date = "2019-08-04T17:46:56.145+04:30")

@Controller
public class SampleApiController implements SampleApi {

    private final SampleApiDelegate delegate;

    @org.springframework.beans.factory.annotation.Autowired
    public SampleApiController(SampleApiDelegate delegate) {
        this.delegate = delegate;
    }

    @Override
    public SampleApiDelegate getDelegate() {
        return delegate;
    }
}
