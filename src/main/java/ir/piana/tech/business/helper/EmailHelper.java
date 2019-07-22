package ir.piana.tech.business.helper;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

/**
 * @author Mohamad Rahmati (rahmatii1366@gmail.com)
 * Date: 6/18/2019 2:43 PM
 **/
@Component
public class EmailHelper {
    private Logger logger = LoggerFactory.getLogger(EmailHelper.class);

    @Autowired
    public JavaMailSender emailSender;

    @Value("${piana.email.send}")
    private boolean sendMail;

    public void sendEmail(String email, String subject, String text) {
        if(sendMail) {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("iran.digifootbal@gmail.com");
            message.setTo(email);
            message.setSubject(subject);
            message.setText(text);
            emailSender.send(message);
        } else {
            logger.info("email not send : " + text);
        }
    }
}
