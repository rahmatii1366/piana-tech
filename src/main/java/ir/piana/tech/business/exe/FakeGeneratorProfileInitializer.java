package ir.piana.tech.business.exe;

import ir.piana.tech.business.data.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

/**
 * @author Mohamad Rahmati (rahmatii1366@gmail.com)
 * Date: 9/30/2019 2:17 PM
 **/
@Component
@Profile({"generate-fake"})
public class FakeGeneratorProfileInitializer implements ProfileInitializer{
    Logger logger = LoggerFactory.getLogger(FakeGeneratorProfileInitializer.class);
    @Value("${piana.generate.fake.count:5}")
    private int count;

    @Autowired
    private UserService userService;

    public void init() {
        userService.generateFakeUsers(count);
        logger.info("create fake users");
    }
}
