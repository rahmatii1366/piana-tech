package ir.piana.tech;

import ir.piana.tech.business.exe.ProfileInitializer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.event.EventListener;

@SpringBootApplication(scanBasePackages = {"ir.piana.tech", "ir.piana.pianatech"})
@EnableCaching
public class PianaTechApplication {
	@Autowired
	private ProfileInitializer profileInitializer;

	public static void main(String[] args) {
		SpringApplication.run(PianaTechApplication.class, args);
	}

	@EventListener(ApplicationReadyEvent.class)
	public void start() {
		profileInitializer.init();
	}
}
