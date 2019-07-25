package ir.piana.tech;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication()
@EnableCaching
public class PianaTechApplication {

	public static void main(String[] args) {
		SpringApplication.run(PianaTechApplication.class, args);
	}

}
