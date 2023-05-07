package cogent.infotech.com.controller;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import cogent.infotech.com.dto.QuestionDTO;
import cogent.infotech.com.dto.StatusDTO;
import cogent.infotech.com.entities.Question;
import cogent.infotech.com.entities.User;
import cogent.infotech.com.mail.MailFunctions;
import cogent.infotech.com.repositories.QuestionRepository;
import cogent.infotech.com.repositories.UserRepository;
import cogent.infotech.com.security.Constants;

@CrossOrigin(Constants.ORIGINS)
@RestController
@RequestMapping(Constants.BASEURL + "/questions")
public class QuestionController {
	
	@Autowired
	private QuestionRepository repo;
	@Autowired
	private UserRepository uRepo;

	
	// This method needs to initialize
	// From angular:
	/* httpclient.post<>(url,
	 * 		body(
	 * 			description_question, 
	 * 			image_src, 
	 * 			datetime,
	 *  		topic, 
	 *  		title, 
	 *  		)
	 *  )
	 *  */
	@PostMapping("/add")
	public Question addQuestion(@RequestBody QuestionDTO q) {
		Question newQuestion = new Question(q.getDescription_question(), q.getImage_src(), q.getDatetime(), q.getTopic(), q.getTitle(), Constants.session.getUsername());
		newQuestion.setImage_src(newQuestion.getImage_src().replace("C:\\fakepath\\", "../../assets/"));
		
		// Send email to all admins when a quesiton is created
		Iterator<User> adminUsers = uRepo.findAllByUserType("admin").iterator();
		while(adminUsers.hasNext()) {
			User current = adminUsers.next();
			MailFunctions.qCreationNotif(current.getEmail(), newQuestion);
		}
		
		return this.repo.save(newQuestion);
	}
	
	/**
	 * 
	 * @param id
	 * @return Question object that matches id
	 */
	@GetMapping("/get")
	public Question getQuestionById(@RequestParam(name = "id") Integer id){
		return this.repo.findById(id).get();
	}
	
	@PutMapping("/update")
	public Question updateQuestion(@RequestBody QuestionDTO updates, @RequestParam(name = "id") Integer id) {
//		Optional <Question> toUpdate = getQuestionById(id);
//		Question updated = toUpdate.get();
		Question toUpdate = getQuestionById(id);
		
		//If the current logged in username matches the username of the question's creator
		// Then quesiton will be able to be updated
		// Otherwise no updates shall be put here
		// --Juan David
		if(toUpdate.getQcreated_by().equals(Constants.session.getUsername())) {
			if(updates.getTitle() != null) {
				toUpdate.setTitle(updates.getTitle());
			}
			if(updates.getDescription_question() != null) {
				toUpdate.setDescription_question(updates.getDescription_question());
			}
			if(updates.getImage_src()!= null) {
				toUpdate.setImage_src(updates.getImage_src());
			}
			if(updates.getDatetime() != null) {
				toUpdate.setDatetime(updates.getDatetime());
			}
			if(updates.getTopic() != null) {
				toUpdate.setTopic(updates.getTopic());
			}
//			if(updates.getAnswers() != null) {
//				updated.setAnswers(updates.getAnswers());
//			}
		}
		return this.repo.save(toUpdate);
	}
	
	/**
	 * 
	 * @param statusdto: the 
	 * @param id: id of the question to be approved
	 * @return Question object with updated status attribute. Sent to database as well.
	 */
	@PutMapping("/approve")
	public Question changeStatus(@RequestBody StatusDTO statusdto, @RequestParam(name = "id") Integer id) {
		Question toApprove = getQuestionById(id);
		
		// If the current logged in user is an admin
		// Then user may change question's status attribute
		// Otherwise no changes will occur
		if(Constants.session.getUserType().equals("admin")) {
			toApprove.setStatus(statusdto.getStatus());
			toApprove.setQapproved_by(Constants.session.getUsername());
		}
		
		return this.repo.save(toApprove);
	}
	
	@DeleteMapping("/delete")
	public void deleteQuestionById(@RequestParam(name = "id") Integer id) {
		Question toDelete = getQuestionById(id);
		repo.delete(toDelete);
	}
	
	/**
	 * 
	 * @return List of all questions in the database
	 */
	@GetMapping("/all")
	public List<Question> getAllQuestion(){
		return this.repo.findAll();
	}
	

	/**
	 * 
	 * @param search: a string input from user
	 * @return searchResults: List of Questions objects where the "search" string is a substring of question.title
	 */
	@GetMapping("/search")
	public List<Question> searchQuestion(@RequestParam(name = "search") String search, @RequestParam(name = "topic") String topic) {
		List<Question> searchResults = new ArrayList<>();
		Iterator<Question> allQuestions = getAllQuestion().iterator();
		
		while(allQuestions.hasNext()) {
			Question thisQuestion = allQuestions.next();
			
			// IF the question is not yet approved, ignore it
			if(thisQuestion.getStatus().equals("approved")) {
				// If the question is approved check for the following conditions
				
				// If no topic is selected, check if the search string matches any substring in the question's title
				if(topic.isEmpty()) {
					//if(Constants.isSubstring(search, thisQuestion.getTitle())) {
					if(thisQuestion.getTitle().toLowerCase().contains(search.toLowerCase())) {
						searchResults.add(thisQuestion);
					}
				}
				// If the search bar is blank, check if the input topic matches the topic of the question
				else if(search.isEmpty()) {
					if(topic.toLowerCase().equals(thisQuestion.getTopic().toLowerCase())) {
						searchResults.add(thisQuestion);
					}
				}
				// If search AND topic are both being searched, make sure the question's respective attributes BOTH match
				else if(
						thisQuestion.getTitle().toLowerCase().contains(search.toLowerCase()) 
						&& topic.toLowerCase().equals(thisQuestion.getTopic().toLowerCase())
						) {
					searchResults.add(thisQuestion);
				}
			}
		}
		
		return searchResults;
	}
	// End of search
}
