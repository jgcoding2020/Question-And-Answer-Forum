package cogent.infotech.com.mail;

import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.Properties;

import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import cogent.infotech.com.entities.Answer;
import cogent.infotech.com.entities.Question;


public class MailFunctions {
	/**
	 * Sends email to admin when a question has been created
	 */
	public static void qCreationNotif(String recipientEmail, Question newQuestion) {
		String senderEmail = "cogent65group7@gmail.com";
		//String senderEmailPassword = "kdpv4Hv7PEP53LF";
		String senderEmailPassword = "jjsrgnmkrrclsvuu";
		String subject = "Question Creation Notification: Admin Action Required";
		String body = "A new question has been created. Please review."
				+"\nID:" + newQuestion.getId() 
				+"\nTitle: "+newQuestion.getTitle()
				+"\nCreated On: "+newQuestion.getDatetime();

		sendFromGmail(senderEmail, senderEmailPassword, recipientEmail, subject, body);
	}
	
	/**
	 * Sends email to admin when an answer has been created
	 */
	public static void aCreationNotif(String recipientEmail, Answer newAnswer) {
		String senderEmail = "cogent65group7@gmail.com";
		//String senderEmailPassword = "kdpv4Hv7PEP53LF";
		String senderEmailPassword = "jjsrgnmkrrclsvuu";
		String subject = "Question Answered Notification: Admin Action Required";
		String body = "A question has been answered recently. Please review."
				+"\nQuestion ID:" + newAnswer.getQuestion().getId() 
				+"\nQuestion Title: "+newAnswer.getQuestion().getTitle()
				+"\nAnswered On: "+newAnswer.getDatetime();

		sendFromGmail(senderEmail, senderEmailPassword, recipientEmail, subject, body);
	}
	
	public static void sendFromGmail(String senderEmail, String senderPassword, String recipientEmail, String subject, String body) {
		System.out.println("Preparing message...");
		
		Properties properties = new Properties();
		properties.setProperty("mail.smtp.starttls.enable", "true");
		properties.setProperty("mail.smtp.host", "smtp.gmail.com");
		properties.setProperty("mail.smtp.port", "587");
		properties.setProperty("mail.smtp.auth", "true");
		
		
		Authenticator auth = new Authenticator() {
			//override the getPasswordAuthentication method
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(senderEmail, senderPassword);
			}
		};
		
		Session session = Session.getInstance(properties, auth);
		
		MimeMessage message = new MimeMessage(session);
		try {
			message.setFrom(new InternetAddress(senderEmail, "Do-Connect Capstone Group 3"));
			message.setRecipient(Message.RecipientType.TO, new InternetAddress(recipientEmail));
			//message.setReplyTo(new InternetAddress(senderEmail));
			message.setSubject(subject, "UTF-8");
			message.setText(body, "UTF-8");
			//Date now = LocalDateTime.now().
			//message.setSentDate(LocalDateTime.now());
			message.setSentDate(new Date());
			System.out.println("Message completed!");
			System.out.println("Sending message...");
			
			Transport transport = session.getTransport("smtp");
			transport.connect("smtp.gmail.com", senderEmail, senderPassword);
			Transport.send(message);
			//Transport.send(message);
			transport.close();
			
		} catch(AddressException ae) {
			ae.printStackTrace();
		} catch(MessagingException me) {
			me.printStackTrace();
		} catch(UnsupportedEncodingException ue) {
			ue.printStackTrace();
		}
		
	}
}
