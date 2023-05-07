import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: 'admin-home',
    templateUrl: './admin-home.component.html',
    styleUrls: ['./admin-home.component.css']
})

export class AdminHomeComponent implements OnInit{
    
    // class variables for router params
    // implemented by Joshua Gardner 
    id = 0;
    username = "";
    userType = "";

    // class constructor
    // implemented by Joshua Gardner
    constructor(private router: Router, private activatedRoute: ActivatedRoute){

    }

    ngOnInit(): void {
        // assigns params to class variables
        // implemented by Joshua Gardner
        this.id = this.activatedRoute.snapshot.params['p1'];
        this.username = this.activatedRoute.snapshot.params['p2'];
        this.userType = this.activatedRoute.snapshot.params['p3'];
    }

    // pending questions button on click function uses router navigation pending-question component with params set
    // implemented by Joshua Gardner
    goPendingQuestion(){
        this.router.navigate(['pending-question', { p1: this.id, p2: this.username, p3: this.userType }]);
    }

    // pending answer button on click function uses router navigation pending-answer component with params set
    // implemented by Joshua Gardner
    goPendingAnswer(){
        this.router.navigate(['pending-answer', { p1: this.id, p2: this.username, p3: this.userType }]);
    }

    // sign out button on click function uses router navigation home component with params set to null
    // implemented by Joshua Gardner
    goSignOut(){
        alert("You have succefully logged out");
        this.router.navigate(['home', {p1: null, p2: null, p3: null}]);
    }
}