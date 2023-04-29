import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: 'pending-question',
    templateUrl: './pending-question.component.html',
    styleUrls: ['./pending-question.component.css']
})

export class PendingQuestionComponent implements OnInit{
    
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