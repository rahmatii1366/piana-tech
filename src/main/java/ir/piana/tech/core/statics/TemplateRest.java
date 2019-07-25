package ir.piana.tech.core.statics;

import ir.piana.tech.api.dto.SignupDto;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

/**
 * @author Mohamad Rahmati (rahmatii1366@gmail.com)
 * Date: 7/25/2019 9:41 AM
 **/
@Controller
public class TemplateRest {
    @GetMapping("/static/{name}")
    public String main(Model model, @PathVariable("name") String name) {
        model.addAttribute("signupDto", new SignupDto());
        return name; //view
    }

    @PostMapping("/static/signup")
    public String greetingSubmit(@ModelAttribute SignupDto signupDto) {
        signupDto.toString();
        return "email-verify";
    }
}
