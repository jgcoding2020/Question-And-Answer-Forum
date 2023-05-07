import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Answer } from "../answer/answer";
import { Question } from "../question/question";
import { AnswerService } from "../answer/answer.service";
import { QuestionService } from "../question/question.service";

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
    pendingAnswers: Answer[];
    pendingQuestions: Question[];

    // class constructor
    // implemented by Joshua Gardner
    constructor(private questionService: QuestionService, private answerService: AnswerService, private router: Router, private activatedRoute: ActivatedRoute){
        this.pendingAnswers = [];
        this.pendingQuestions = [];
    }

    ngOnInit(): void {
        // assigns params to class variables
        // implemented by Joshua Gardner
        this.id = this.activatedRoute.snapshot.params['p1'];
        this.username = this.activatedRoute.snapshot.params['p2'];
        this.userType = this.activatedRoute.snapshot.params['p3'];

        
        // creates list of all answers from database
        // implemented by Joshua Gardner
        this.answerService.getAnswers().subscribe((data: Answer[]) => {
            console.log("In subscribe");
            console.log(data);
            
            let count = 0;
            // creates array of answers with status "Pending approval"
            // implemented by Joshua Gardner
            for (let i = 0; i < data.length; i++){
                if (data[i].status == "Pending approval"){
                    this.pendingAnswers[count] = data[i];
                    count++;
                }
            }
        })

        // creates list of all questions from database
        // implemented by Joshua Gardner
        this.questionService.getQuestions().subscribe((data: Question[]) => {
            console.log(data);
            
            let count = 0;
            // creates array of questions with status "Pending for approval"
            // implemented by Joshua Gardner
            for (let i = 0; i < data.length; i++){
                if (data[i].status == "Pending for approval"){
                    this.pendingQuestions[count] = data[i];
                    count++;
                    console.log(count);
                }
            }
        })
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