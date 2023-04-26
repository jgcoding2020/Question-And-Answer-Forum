package cogent.infotech.com.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginDTO {
	private String username;
	private String password;
}
