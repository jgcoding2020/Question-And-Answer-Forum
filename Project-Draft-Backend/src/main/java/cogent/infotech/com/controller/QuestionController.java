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
import cogent.infotech.com.repositories.QuestionRepository;
import cogent.infotech.com.security.Constants;

@CrossOrigin(Constants.ORIGINS)
@RestController
@RequestMapping(Constants.BASEURL + "/questions")
public class QuestionController {
	
	@Autowired
	private QuestionRepository repo;
	
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
	@PostMapping("/addquestion")
	public Question addQuestion(@RequestBody QuestionDTO q) {
		Question newQuestion = new Question(q.getDescription_question(), q.getImage_src(), q.getDatetime(), q.getTopic(), q.getTitle(), Constants.session.getUsername());
		return this.repo.save(newQuestion);
	}
	
	
//	@GetMapping("/getquestionbyid")
//	public Optional<Question> getQuestionById(@RequestParam(name = "id") Integer id){
//		return this.repo.findById(id);
//	}
	@GetMapping("/getquestionbyid")
	public Question getQuestionById(@RequestParam(name = "id") Integer id){
		return this.repo.findById(id).get();
	}
	
	@PutMapping("/updatequestion")
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
	
	@DeleteMapping("/deletequestionbyid")
	public String deleteQuestionById(@RequestParam(name = "id") Integer id) {
//		Optional<Question> toDelete = getQuestionById(id);
//		repo.delete(toDelete.get());
		Question toDelete = getQuestionById(id);
		repo.delete(toDelete);
		return "Question succesfully deleted";
	}
	
	@GetMapping("/getallquestion")
	public List<Question> getAllQuestion(){
		return this.repo.findAll();
	}
	
	@GetMapping("/getquestionbytopic")
	public List <Question> getQuesitonByTopic(@RequestParam(name = "topic") String topic){
		List<Question> qList = getAllQuestion();
		Iterator<Question> allQuestions = qList.iterator();
		
		List<Question> questionsByTopic = new ArrayList<Question>();
		while(allQuestions.hasNext()) {
			Question thisQuestion = allQuestions.next();
			
			if(thisQuestion.getTopic().equals(topic)) {
				questionsByTopic.add(thisQuestion);
			}
		}
		return questionsByTopic;
	}
	
	@GetMapping("/search")
	public List<Question> searchQuestion(@RequestParam(name = "search") String search) {
		List<Question> searchResults = new ArrayList<>();
		Iterator<Question> allQuestions = getAllQuestion().iterator();
		
		while(allQuestions.hasNext()) {
			Question thisQuestion = allQuestions.next();
			
			if(Constants.isSubstring(search, thisQuestion.getTitle())) {
				searchResults.add(thisQuestion);
			}
		}
		
		return searchResults;
	}
	
	// No clue what this method is meant to do
	// Functionality was not specified
	// -- Juan David
	@GetMapping("/getallquestionfalse")
	public void getAllQuestionFalse() {
		
	}
}
