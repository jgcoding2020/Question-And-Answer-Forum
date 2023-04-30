import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: 'created-answer',
    templateUrl: './pending-answer.component.html',
    styleUrls: ['./pending-answer.component.css']
})

export class PendingAnswerComponent implements OnInit{
    
    id = 0;
    username = "";
    userType = "";

    constructor(private router: Router, private activatedRoute: ActivatedRoute){

    }

    ngOnInit(): void {
        this.id = this.activatedRoute.snapshot.params['p1'];
        this.username = this.activatedRoute.snapshot.params['p2'];
        this.userType = this.activatedRoute.snapshot.params['p3'];
    }

    goPendingQuestion(){
        this.router.navigate(['pending-question', {p1: null, p2: null, p3: null}]);
    }
    goPendingAnswer(){
        this.router.navigate(['pending-answer', {p1: null, p2: null, p3: null}]);
    }

    goSignOut(){
        this.router.navigate(['home', {p1: null, p2: null, p3: null}]);
    }
}