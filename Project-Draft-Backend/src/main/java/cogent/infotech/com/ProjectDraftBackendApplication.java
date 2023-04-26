package cogent.infotech.com;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import cogent.infotech.com.entities.User;
import cogent.infotech.com.repositories.UserRepository;

@SpringBootApplication
public class ProjectDraftBackendApplication {

	@Autowired
	UserRepository repo;
	
	public static void main(String[] args) {
		SpringApplication.run(ProjectDraftBackendApplication.class, args);
	}

	@PostConstruct
	public void initUsers() {
		List<User> users = new ArrayList<>();
		users.add(new User("David", "davi123", "password", "david@gmail.com", "admin"));
		users.add(new User("Juan", "juan23", "password", "jd@gmail.com", "admin"));
		users.add(new User("Sara", "sar1t4" ,"password", "sarar@gmail.com", "admin"));
		users.add(new User("Royce", "raaaa" ,"password", "ramalama@gmail.com", "user"));
		users.add(new User("Anudeep", "anuuuu" ,"password", "amunra@gmail.com", "user"));
		users.add(new User("Gyanendra", "arjuna227" ,"password", "parvati@gmail.com", "user"));
		users.add(new User("Cecilia", "sancta27" ,"password", "inesa@gmail.com", "user"));
		repo.saveAll(users);
		
	}
}
