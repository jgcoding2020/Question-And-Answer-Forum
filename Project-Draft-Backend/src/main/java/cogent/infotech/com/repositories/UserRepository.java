package cogent.infotech.com.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import cogent.infotech.com.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer>{
	// This method is implemented in in CustomUserDetailService when overriding loadByUsername()
	// Necessary for User authentication
	// Don't know how it works though
	// -- Juan David
	User findByUsername(String username);
	
	// I don't know why this is here yet
	// I'm following a tutorial on JWT and the guy out this method here
	// Will update if I ever figure it out
	// -- Juan David
	Boolean existsByUsername(String username);
}
