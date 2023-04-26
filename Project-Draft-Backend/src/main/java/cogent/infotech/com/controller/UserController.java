package cogent.infotech.com.controller;

import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import cogent.infotech.com.dto.LoginDTO;
import cogent.infotech.com.entities.User;
import cogent.infotech.com.repositories.UserRepository;

@RestController
@RequestMapping("api/user")
public class UserController {
	@Autowired
	UserRepository repo;
	
	// Home
	@GetMapping("/")
	public String home() {
		return "Welcome to Do Connect";
	}
	
	// Add user/add new user
	@PostMapping("/adduser")
	public User addUser(@RequestBody User user) {
		return repo.save(user);
	}
	
	@GetMapping("/getallusers")
	public List<User> getAllUsers(){
		return repo.findAll();
	}
	
	@GetMapping("/getuserbyId")
	public Optional<User> getUserById(@RequestParam(value = "id") Integer id) {
		return repo.findById(id);
	}
	
	/**
	 * User Login
	 * @param login
	 * @return a single user object based on the passed Login username and password
	 */
	@GetMapping("/getLogin")
	public User getLogin(@RequestBody LoginDTO login) {
		List<User> userList = repo.findAll();
		Iterator<User> list = userList.listIterator();
		User currentUser = new User();
		while(list.hasNext()) {
			User user = list.next();
			if(
					login.getUsername().equals(user.getUsername())
					&&
					login.getPassword().equals(user.getPassword())
					) {
				
				currentUser = user;
				
			}
		}
		return currentUser;	
	}
	
	// This funciton is not returning an object but also not returning an error
	@GetMapping("/getbyname")
	public User getByName(@RequestParam(value = "name") String name){
		return repo.findByUsername(name);
	}
	
}
