package ir.piana.tech.business.exe;

import ir.piana.tech.business.data.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

/**
 * @author Mohamad Rahmati (rahmatii1366@gmail.com)
 * Date: 9/30/2019 2:17 PM
 **/
@Component
@Profile({"!generate-fake"})
public class CommonProfileInitializer implements ProfileInitializer{
    public void init() {

    }
}
