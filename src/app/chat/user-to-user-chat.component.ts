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

export class UserToUserChatComponent implements OnInit{
    
    UserId = 0;
    username = "";
    userType = "";
    recipientUsername="";
    chat: Chat;
    allChats: Chat[]
    myChats: Chat[];
    theirChats: Chat[]
    
    constructor(private chatService:ChatService, private router: Router, private activatedRoute: ActivatedRoute){
        this.chat = new Chat();
        this.allChats = [];
        this.myChats = [];
        this.theirChats = [];
    }

    ngOnInit(): void {
        this.UserId = this.activatedRoute.snapshot.params['p1'];
        this.username = this.activatedRoute.snapshot.params['p2'];
        this.userType = this.activatedRoute.snapshot.params['p3'];
        this.recipientUsername = this.activatedRoute.snapshot.params['p4'];
        console.log(this.recipientUsername);

        this.chatService.getAllChats().subscribe(
            (data: Chat[])=>{
                this.allChats = data;
                console.log(this.allChats);
            }
        );
    }

    sendChatMessage(message: String){
        // console.log(this.recipientUsername);
        // console.log(message);
        this.chatService.addChat(this.recipientUsername, message).subscribe();
        window.location.reload();
    }

    goCreateQuestion(){
        this.router.navigate(['create-question', {p1: this.UserId, p2: this.username, p3: this.userType}]);
    }

    goSearchQuestion(){
        this.router.navigate(['search-question', {p1: this.UserId, p2: this.username, p3: this.userType}]);
    }

    goChat(){
        this.router.navigate(['chat', {p1: this.UserId, p2: this.username, p3: this.userType}]);
    }

    goSignOut(){
        alert("You have succefully logged out");
        this.router.navigate(['home', {p1: null, p2: null, p3: null}]);
    }

    printMyChats(){

    }

    printTheirChats(){
        
    }

}