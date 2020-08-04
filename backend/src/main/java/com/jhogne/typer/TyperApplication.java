package com.jhogne.typer;

import com.jhogne.typer.Model.Room;
import com.jhogne.typer.Model.RoomCleaner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@SpringBootApplication
public class TyperApplication {

	public static void main(String[] args) {
		SpringApplication.run(TyperApplication.class, args);
		ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);
		scheduler.scheduleAtFixedRate(new RoomCleaner(), 10, 10, TimeUnit.SECONDS);
	}
}
