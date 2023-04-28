package cogent.infotech.com.security;

public class Constants {
	public static final String BASEURL = "/api";
	public static final String ORIGINS = "http://localhost:4200";
	
	// Checks is substring is substring of superstring
	public static boolean isSubstring(String substring, String superstring) {
		if(superstring.toLowerCase().indexOf(substring.toLowerCase()) != -1)
			return true;
		return false;
	}
}
