package cogent.infotech.com.entities;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "questions")
public class Question {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	private String description_question;
	private String image_src;
	private String datetime;
	private String status;
	private String topic;
	private String title;
	@OneToMany(mappedBy="question", fetch = FetchType.EAGER)
	@JsonIgnore
	private List<Answer> answers;
	
	// These last two fields maybe should be of type User instead of String
	// Considering both of these fields come from User db anyway
	//OnetoOne
	private String qcreated_by;
	//OneToOne
	private String qapproved_by;
	public Question(String description_question, String image_src, String datetime, String topic,
			String title, String qcreated_by) {
		
		this.description_question = description_question; //
		this.image_src = image_src;//This should probably also be null
		this.datetime = datetime;//
		this.status = "Pending for approval";
		this.topic = topic;
		this.title = title; //
		this.answers = null;
		this.qcreated_by = qcreated_by;
		this.qapproved_by = null;
	}

	
}
