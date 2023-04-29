package cogent.infotech.com.controller;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import cogent.infotech.com.dto.ChatDTO;
import cogent.infotech.com.entities.Chat;
import cogent.infotech.com.repositories.ChatRepository;
import cogent.infotech.com.security.Constants;

@CrossOrigin(Constants.ORIGINS)
@RestController
@RequestMapping(Constants.BASEURL + "/chat")
public class ChatController {
	@Autowired
	private ChatRepository repo;
	
	@PostMapping("/send")
	public Chat sendMessage(@RequestBody ChatDTO chatdto) {
		Chat newChat = new Chat(
				Constants.session.getUsername(),
				chatdto.getRecipientUser(),
				chatdto.getMessage(),
				LocalDateTime.now().toString()
				);
		
		return this.repo.save(newChat);
	}
	
	@GetMapping("/all")
	public List<Chat> getAllChats(){
		return this.repo.findAll();
	}
	
	// Returns all messages where the currently logged in user is the sender
	// This way, the chats can all be printed on the left
	// May not be necessary, but I hav it here just in case
	// -- Juan David
	@GetMapping("/sender")
	public List<Chat> getChatAsSender(){
		Iterator allChats = getAllChats().iterator();
		List<Chat> senderChats = new ArrayList<>();
		while(allChats.hasNext()) {
			Chat thisChat = (Chat)allChats.next();
			if(Constants.session.getUsername().equals(thisChat.getSender())) {
				senderChats.add(thisChat);
			}
		}
		
		return senderChats;
	}
	
	// Returns all messages where the currently logged in user is the receiver
	// This way, the chats can all be printed on the left
	// May not be necessary, but I hav it here just in case
	// -- Juan David
	@GetMapping("/receiver")
	public List<Chat> getChatAsReceiver(){
		Iterator allChats = getAllChats().iterator();
		List<Chat> receiverChats = new ArrayList<>();
		while(allChats.hasNext()) {
			Chat thisChat = (Chat)allChats.next();
			if(Constants.session.getUsername().equals(thisChat.getRecipient())) {
				receiverChats.add(thisChat);
			}
		}
		
		return receiverChats;
	}
	
	
	
}
