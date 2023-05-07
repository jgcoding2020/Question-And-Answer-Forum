import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ChatService } from "./chat.service";
import { Chat } from "./chat";
import { User } from "../login/user";
import { UserService } from "../login/user.service";

@Component({
    selector: 'user-to-user-chat',
    templateUrl: './user-to-user-chat.component.html',
    styleUrls: ['./user-to-user-chat.component.css']
})

// Base UserToUserChatComponent implemented by Joshua Gardner
// UserToUserChat chat functionality implemented by Juan David
export class UserToUserChatComponent implements OnInit{
    
    // class variables for router params
    // implemented by Joshua Gardner
    // additions made by Juan David 
    UserId = 0;
    username = "";
    userType = "";
    recipientUsername="";
    chat: Chat;
    allChats: Chat[]
    myChats: Chat[];
    theirChats: Chat[]
    
    // class constructor
    // implemented by Joshua Gardner
    // modified by Juan David
    constructor(private chatService:ChatService, private router: Router, private activatedRoute: ActivatedRoute){
        this.chat = new Chat();
        this.allChats = [];
        this.myChats = [];
        this.theirChats = [];
    }

    ngOnInit(): void {
        // assigns params to class variables
        // implemented by Joshua Gardner 
        // addition made by Juan David
        this.UserId = this.activatedRoute.snapshot.params['p1'];
        this.username = this.activatedRoute.snapshot.params['p2'];
        this.userType = this.activatedRoute.snapshot.params['p3'];
        this.recipientUsername = this.activatedRoute.snapshot.params['p4'];
        console.log(this.recipientUsername);

        // gets all chats from database
        // implemented by Juan David
        this.chatService.getAllChats().subscribe(
            (data: Chat[])=>{
                this.allChats = data;
                console.log(this.allChats);
            }
        );

        // gets all this user's chat data
        // implemented by Juan David
        this.chatService.getMyChats(this.recipientUsername).subscribe(
            (data: Chat[])=>{
                this.myChats = data;
                console.log(this.myChats);
            }
        );

        // gets all chats with this user
        // implemented by Juan David
        this.chatService.getTheirChats(this.recipientUsername).subscribe(
            (data: Chat[])=>{
                this.theirChats = data;
                console.log(this.theirChats);
            }
        )
    }

    // send chat message to database
    // implemented by Juan David
    sendChatMessage(message: String){
        // console.log(this.recipientUsername);
        // console.log(message);
        this.chatService.addChat(this.recipientUsername, message).subscribe();
        window.location.reload();
    }

    // create question button on click function uses router navigation create-question component with params set
    // implemented by Joshua Gardner
    goCreateQuestion(){
        this.router.navigate(['create-question', {p1: this.UserId, p2: this.username, p3: this.userType}]);
    }

    // search question button on click function uses router navigation search-question component with params set
    // implemented by Joshua Gardner
    goSearchQuestion(){
        this.router.navigate(['search-question', {p1: this.UserId, p2: this.username, p3: this.userType}]);
    }

    // chat button on click function uses router navigation chat component with params set
    // implemented by Joshua Gardner
    goChat(){
        this.router.navigate(['chat', {p1: this.UserId, p2: this.username, p3: this.userType}]);
    }

    // Your home button on click function uses router navigation user-home component with params set
    // implemented by Joshua Gardner
    goUserHome() {
        this.router.navigate(['user-home', { p1: this.UserId, p2: this.username, p3: this.userType }]);
    }

    // sign out button on click function uses router navigation home component with params set to null
    // implemented by Joshua Gardner
    goSignOut(){
        alert("You have succefully logged out");
        this.router.navigate(['home', {p1: null, p2: null, p3: null}]);
    }

    // implemented by Juan David
    printMyChats(){

    }

    // implemented by Juan David
    printTheirChats(){
        
    }

}