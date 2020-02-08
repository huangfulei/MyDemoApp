package com;


import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class LiftApplication extends SpringBootServletInitializer {

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(LiftApplication.class);
    }

    public static void main(String[] args) {
        SpringApplication.run(LiftApplication.class, args);
        System.out.println("Running............");
    }

    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }

}
