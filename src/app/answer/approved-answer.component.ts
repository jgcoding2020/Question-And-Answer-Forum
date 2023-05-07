import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Question } from "../question/question";
import { QuestionService } from "../question/question.service";
import { Answer } from "./answer";
import { AnswerService } from "./answer.service";

@Component({
    selector: 'approved-answer',
    templateUrl: './approved-answer.component.html',
    styleUrls: ['./approved-answer.component.css']
})

// ApprovedAnswerComponent provides functionality for approved-answer template
// implemented by Joshua Gardner 
export class ApprovedAnswerComponent implements OnInit{
    
    // class variables for router params
    // implemented by Joshua Gardner
    UserId = 0;
    username = "";
    userType = "";
    questionId = 0;
    questions: Question[];
    questionToAnswer: Question;
    answers: Answer[];
    approvedAnswers: Answer[];
    
    // class constructor
    // implemented by Joshua Gardner
    constructor(private answerService: AnswerService, private questionService: QuestionService, private router: Router, private activatedRoute: ActivatedRoute){
        this.questionToAnswer = new Question();
        this.questions = [];
        this.answers = [];
        this.approvedAnswers = [];
    }

    ngOnInit(): void {
        // assigns params to class variables
        // implemented by Joshua Gardner 
        this.UserId = this.activatedRoute.snapshot.params['p1'];
        this.username = this.activatedRoute.snapshot.params['p2'];
        this.userType = this.activatedRoute.snapshot.params['p3'];
        this.questionId = this.activatedRoute.snapshot.params['p4'];
        
        // creates array of questions obtained from database
        // implemented by Joshua Gardner
        this.questionService.getQuestions().subscribe((data: Question[]) => {
            console.log(data);
            this.questions = data;

            // locates question to answer based on question id
            // implemented by Joshua Gardner
            for (let i = 0; i < data.length; i++){
                if (data[i].id == this.questionId)
                    this.questionToAnswer = data[i]; 
            }
        })

        // creates array of answers from the database
        // implemented by Joshua Gardner
        this.answerService.getAnswers().subscribe((data: Answer[]) => {
            console.log(data);
            this.answers = data;

            let count = 0;
            // creates array of approved answers based on answer status
            for (let i = 0; i < this.answers.length; i++){
                if (this.answers[i].status == "approved" && this.answers[i].question.id == this.questionId){
                    this.approvedAnswers[count] = data[i];
                    count++;
                }
            }
            console.log(this.approvedAnswers);
        })
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
}