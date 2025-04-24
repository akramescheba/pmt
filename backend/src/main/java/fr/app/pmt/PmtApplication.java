package fr.app.pmt;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@EntityScan(basePackages = "fr.app.pmt")
@ComponentScan(basePackages = "fr.app.pmt")
public class PmtApplication {

	public static void main(String[] args) {
		SpringApplication.run(PmtApplication.class, args);
	}

}
