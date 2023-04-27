package cogent.infotech.com.controller;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import cogent.infotech.com.dto.LoginDTO;
import cogent.infotech.com.entities.User;
import cogent.infotech.com.repositories.UserRepository;
import cogent.infotech.com.security.Constants;

@CrossOrigin(Constants.ORIGINS)
@RestController
@RequestMapping(Constants.BASEURL + "/user")
public class UserController {
	@Autowired
	UserRepository repo;
	
	// Home
	@GetMapping("/")
	public String home() {
		return "Welcome to Do Connect";
	}
	
	// When spring-security dependency is injected into project,
	// It causes the execution of this request to return Error: 403
	// It has something to do with "cfrs" or something
	// This "cfsr" needs to be disabled in the SecurityConfig in order to prevent this error
	// In the meantime, the project is running wihtout any security dependencies
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
		
		// Originally tried to do this with a for-each loop
		// Did not work. It kept returning null objects
		// Joshua gave me the idea to use an iterator instead.
		// Now it works. I don't know whjy though.
		// Thanks Joshua.
		// --Juan David
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
	// --Juan David
	// 
	// I replaced the repo methods with a method that iterates through a list of Users
	// and returns a User object that matches the name parameter
	// This is probably not how it is meant to be done, but I could not firgure out how to do it via the repository.
	// It works... For now
	// --Juan David
	@GetMapping("/getbyname")
	public User getByName(@RequestParam (name = "username") String username){
//		return repo.findByUsername(username);
		
//		return username;
//		return repo.findAll();
		List<User> userList = repo.findAll();
		Iterator<User> list = userList.listIterator();
		User currentUser = new User();
		while(list.hasNext()) {
			User user = list.next();
			if(username.equals(user.getUsername())) {
				currentUser = user;
			}
		}
		return currentUser;	
	}
	
	/**
	 * 
	 * @param user: object obtained from HTTP body
	 * @param id: parameter obtained from HTTP request
	 * @return User object with updated information
	 */
	@PutMapping("/updateuser")
	public User updateUser(@RequestBody User user, @RequestParam Integer id) {
		Optional<User> userOptional = getUserById(id);
		User updatedUser = userOptional.get();

		// This may look not very pretty, but it works, so I'm doing it this way
		// Basically a series of if-statements
		// Each if, verifies if an attribute of User was entered in the body or not
		// If it has been entered, then the value for that attribute is replaced with the input
		// If anybody knows a different way, please let me know
		//
		// --Juan David
		if(user.getName() != null) {
			updatedUser.setName(user.getName());
		}
		if(user.getUsername()!= null) {
			updatedUser.setUsername(user.getUsername());
		}
		if(user.getPassword() != null) {
			updatedUser.setPassword(user.getPassword());
		}
		if(user.getEmail() != null) {
			updatedUser.setEmail(user.getEmail());
		}
		if(user.getUserType() != null) {
			updatedUser.setUserType(user.getUserType());
		}
		
		return repo.save(updatedUser);
	}
	
	@GetMapping("/getbyallusertype")
	public List<User> getByAllUserType(@RequestParam(name = "userType") String userType){
		List<User> userList = getAllUsers();
		Iterator <User> allUsers = userList.iterator();
		
		List<User> userListByType = new ArrayList<>(); 
		
		while(allUsers.hasNext()) {
			User thisUser = allUsers.next();
			if(thisUser.getUserType().equals(userType)) {
				userListByType.add(thisUser);
			}
		}
		
		return userListByType;
		
		
	}
}
