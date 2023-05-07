import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { User } from "../login/user";
import { UserService } from "../login/user.service";

@Component({
    selector: 'chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css']
})

// Base ChatComponent implemented by Joshua Gardner
// ChatComponent functionality implemented by Juan David
export class ChatComponent implements OnInit{
    
    UserId = 0;
    username = "";
    userType = "";
    user: User;
    users: User[];
    trueUsers: User[]
    
    constructor(private router: Router, private activatedRoute: ActivatedRoute, private userService: UserService){
        this.user = new User();
        this.users = [];
        this.trueUsers = [];
    }

    ngOnInit(): void {
        this.UserId = this.activatedRoute.snapshot.params['p1'];
        this.username = this.activatedRoute.snapshot.params['p2'];
        this.userType = this.activatedRoute.snapshot.params['p3'];

        console.log(this.UserId);
        console.log(this.username);
        console.log(this.userType);

        this.userService.getUsers().subscribe(
            (data: User[]) =>{
                this.users = data;

                // count needs to be outside of the loop
                // otherwise it will always be reset to 0 
                // and not actually print out the whole list
                let count = 0;

                // creates array of users where userType="user"
                // array is displayed as list
                // this list represents other users which the current user may interact with
                // --Juan David
                for (let i = 0; i < data.length; i++) {
                    // let count = 0;
                    
                    if (data[i].userType == "user") {
                        console.log(data[i].userType == "user");
                        this.trueUsers[count] = data[i];
                        count++;
                        console.log(count);
                    }
                }
                for(let i = 0; i<this.trueUsers.length;i++){
                    console.log(this.trueUsers[i])
                }
            }
            );

    }

    // router navigation applied to create question button with user params 
    // implemented by Joshua Gardner
    goCreateQuestion(){
        this.router.navigate(['create-question', {p1: this.UserId, p2: this.username, p3: this.userType}]);
    }

    // router navigation applied to search question button with user params 
    // implemented by Joshua Gardner
    goSearchQuestion(){
        this.router.navigate(['search-question', {p1: this.UserId, p2: this.username, p3: this.userType}]);
    }

    // router navigation applied to Chat button with user params
    // implemented by Joshua Gardner
    goChat(){
        this.router.navigate(['chat', {p1: this.UserId, p2: this.username, p3: this.userType}]);
    }

    // Somehow, this username needs to be passed on to the user-to-user-chat component
    //--Juan David
    startChat(recipientUsername: String){
        console.log(recipientUsername);
        this.router.navigate(['user-to-user-chat', {p1: this.UserId, p2: this.username, p3: this.userType, p4:recipientUsername}]);
    }

    // signout function changes user params to null and returns user to home page
    // implemented by Joshua Gardner
    goSignOut(){
        alert("You have successfully logged out!");
        this.router.navigate(['home', {p1: null, p2: null, p3: null}]);
    }
}