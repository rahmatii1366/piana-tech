package ir.piana.tech.core.statics;

import ir.piana.pianatech.server.api.dto.SignupDto;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;

/**
 * @author Mohamad Rahmati (rahmatii1366@gmail.com)
 * Date: 7/25/2019 9:41 AM
 **/
//@Controller
public class TemplateRest {
//    @GetMapping("/{name}")
    public String main(Model model, @PathVariable("name") String name) {
        model.addAttribute("signupDto", new SignupDto());
        return name; //view
    }

//    @PostMapping("/static/signup")
    public String greetingSubmit(@ModelAttribute SignupDto signupDto) {
        signupDto.toString();
        return "email-verify";
    }
}
