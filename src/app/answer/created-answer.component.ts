import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: 'created-answer',
    templateUrl: './created-answer.component.html',
    styleUrls: ['./created-answer.component.css']
})

// CreatedAnswerComponent provides functionality for created-answer template
// implemented by Joshua Gardner 
export class CreatedAnswerComponent implements OnInit{
    
    // class variables for router params
    // implemented by Joshua Gardner
    UserId = 0;
    username = "";
    userType = "";
    
    // class constructor
    // implemented by Joshua Gardner
    constructor(private router: Router, private activatedRoute: ActivatedRoute){

    }

    ngOnInit(): void {
        // assigns params to class variables
        // implemented by Joshua Gardner 
        this.UserId = this.activatedRoute.snapshot.params['p1'];
        this.username = this.activatedRoute.snapshot.params['p2'];
        this.userType = this.activatedRoute.snapshot.params['p3'];
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

    // sign out button on click function uses router navigation home component with params set to null
    // implemented by Joshua Gardner
    goSignOut(){
        alert("You have succefully logged out");
        this.router.navigate(['home', {p1: null, p2: null, p3: null}]);
    }
}
