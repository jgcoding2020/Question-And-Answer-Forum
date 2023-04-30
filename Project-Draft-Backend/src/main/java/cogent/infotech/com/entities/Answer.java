package cogent.infotech.com.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "answers")
public class Answer {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String description_answer;
	private String img_src = null;
	private String status;
	private String datetime;
	@ManyToOne
	private Question question;
	
	// Just like in the question entity
	// I think these last two fields should be of User type
	// or User.getusername()
	//Onetoone
	private String approved_by;
	//onetone
	private String created_by;
	
	public Answer(String description_answer, String img_src, String datetime, Question question, String created_by) {

		this.description_answer = description_answer;
		this.img_src = img_src;
		this.status = "Pending approval";
		this.datetime = datetime;
		this.question = question;
		this.approved_by = null;
		this.created_by = created_by;
	}
	
	
}
