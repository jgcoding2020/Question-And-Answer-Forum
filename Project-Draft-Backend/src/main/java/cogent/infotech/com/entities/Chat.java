package cogent.infotech.com.entities;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Chat {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String sender;
	private String recipient;
	private String message;
	private String datetime;
	
	public Chat(String sender, String recipient, String message, String datetime) {
		super();
		this.sender = sender;
		this.recipient = recipient;
		this.message = message;
		this.datetime = datetime;
	}
	
	

	
	
	
}