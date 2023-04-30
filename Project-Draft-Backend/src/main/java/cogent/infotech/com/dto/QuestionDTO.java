package cogent.infotech.com.dto;

import java.util.List;

import javax.persistence.FetchType;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

import cogent.infotech.com.entities.Answer;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class QuestionDTO {
	private String description_question;
	private String image_src;
	private String datetime;
	private String topic;
	private String title;
	//OnetoOne
	//private String qcreated_by;

}
