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

import cogent.infotech.com.dto.StatusDTO;
import cogent.infotech.com.entities.Answer;
import cogent.infotech.com.entities.Question;
import cogent.infotech.com.entities.User;
import cogent.infotech.com.mail.MailFunctions;
import cogent.infotech.com.repositories.AnswerRepository;
import cogent.infotech.com.repositories.UserRepository;
import cogent.infotech.com.security.Constants;

@CrossOrigin(Constants.ORIGINS)
@RestController
@RequestMapping(Constants.BASEURL + "/answer")
public class AnswerController {
	@Autowired
	private AnswerRepository repo;
	@Autowired
	private UserRepository uRepo;
	
	@GetMapping("/all")
	public List<Answer> getAllAnswers(){
		return this.repo.findAll();
	}
	
	@PostMapping("/add")
	public Answer addAnswer(@RequestBody Answer answer) {
		answer.setImg_src(answer.getImg_src().replace("C:\\fakepath\\", "../../assets/"));
		
		Iterator<User> adminUsers = uRepo.findAllByUserType("admin").iterator();
		while(adminUsers.hasNext()) {
			User current = adminUsers.next();
			MailFunctions.aCreationNotif(current.getEmail(), answer);
		}
		
		return this.repo.save(answer);
	}
	
	@GetMapping("/get")
	public Answer getById(@RequestParam(name = "id") Integer id){
		return this.repo.findById(id).get();
	}
	
	@PutMapping("/approve")
	public Answer changeStatus(@RequestBody StatusDTO statusdto, @RequestParam(name = "id") Integer id) {
		Answer toApprove = getById(id);
		
		// If the current logged in user is an admin
		// Then user may change answer's status attribute
		// Otherwise no changes will occur
		if(Constants.session.getUserType().equals("admin")) {
			toApprove.setStatus(statusdto.getStatus());
			toApprove.setApproved_by(Constants.session.getUsername());
		}
		
		return this.repo.save(toApprove);
	}
	
	@PutMapping("/update")
	public Answer updateAnswer(@RequestBody Answer updates, @RequestParam(name = "id") Integer id) {
		Answer updated = getById(id);
		
		// Some of these will need to be removed because they represent values that should not be updated
		// Maybe do something similar to getLogin() where we request a DTO object with reduced number of fields
		// --Juan David
		if(updates.getDescription_answer() != null) {
			updated.setDescription_answer(updates.getDescription_answer());
		}
//		if(updates.getQuestion() != null) {
//			updated.setQuestion(updates.getQuestion());
//		}
		if(updates.getCreated_by() != null) {
			updated.setCreated_by(updates.getCreated_by());
		}
		if(updates.getDatetime() != null) {
			updated.setDatetime(updates.getDatetime());
		}
		if(updates.getImg_src() != null) {
			updated.setImg_src(updates.getImg_src());
		}
		
		return this.repo.save(updated);
	}
	
	@DeleteMapping("/delete")
	public void deleteAnswerById(@RequestParam(name = "id")Integer id) {
		Answer toDelete = getById(id);
		repo.delete(toDelete);
	}
	
	@GetMapping("/question")
	public List<Answer> getAnswerByQuestionId(@RequestParam (name = "question_id")Integer questionId){
		Iterator<Answer> all = getAllAnswers().iterator();
		List<Answer> answersOfQuestion = new ArrayList<Answer>();
		while(all.hasNext()) {
			Answer currentAnswer = all.next();
			if(currentAnswer.getQuestion().getId() == questionId) {
				answersOfQuestion.add(currentAnswer);
			}
		}
		
		return answersOfQuestion;
	}
	
	
	
	
}
