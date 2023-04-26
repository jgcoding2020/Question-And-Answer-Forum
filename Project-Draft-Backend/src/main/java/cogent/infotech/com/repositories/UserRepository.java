package cogent.infotech.com.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import cogent.infotech.com.entities.User;



@Repository
public interface UserRepository extends JpaRepository<User, Integer>{
	User findByUsername(String username);
	Boolean existsByUsername(String username);
}
