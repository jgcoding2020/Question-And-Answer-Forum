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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import cogent.infotech.com.entities.Answer;
import cogent.infotech.com.repositories.AnswerRepository;
import cogent.infotech.com.security.Constants;

@CrossOrigin(Constants.ORIGINS)
@RestController
@RequestMapping(Constants.BASEURL + "/answer")
public class AnswerController {
	@Autowired
	private AnswerRepository repo;
	
	@GetMapping("/all")
	public List<Answer> getAllAnswers(){
		return this.repo.findAll();
	}
	
	@PostMapping("/add")
	public Answer addAnswer(@RequestBody Answer answer) {
		return this.repo.save(answer);
	}
	
	@GetMapping("/get")
	public Answer getById(@RequestParam(name = "id") Integer id){
		return this.repo.findById(id).get();
	}
	
	public Answer updateAnswer(@RequestBody Answer updates, @RequestParam(name = "id") Integer id) {
		Answer updated = getById(id);
		
		// Some of these will need to be removed because they represent values that should not be updated
		// Maybe do something similar to getLogin() where we request a DTO object with reduced number of fields
		// --Juan David
		if(updates.getDescription_answer() != null) {
			updated.setDescription_answer(updates.getDescription_answer());
		}
		if(updates.getStatus() != null) {
			updated.setStatus(updates.getStatus());
		}
//		if(updates.getQuestion() != null) {
//			updated.setQuestion(updates.getQuestion());
//		}
		if(updates.getApproved_by() != null) {
			updated.setApproved_by(updates.getApproved_by());
		}
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
	public String deleteAnswerById(@RequestParam(name = "id")Integer id) {
		Answer toDelete = getById(id);
		repo.delete(toDelete);
		return "";
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
