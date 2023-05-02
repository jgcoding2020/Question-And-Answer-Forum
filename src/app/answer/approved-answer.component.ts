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

export class ApprovedAnswerComponent implements OnInit{
    
    UserId = 0;
    username = "";
    userType = "";
    questionId = 0;
    questions: Question[];
    questionToAnswer: Question;
    answers: Answer[];
    approvedAnswers: Answer[];
    
    constructor(private answerService: AnswerService, private questionService: QuestionService, private router: Router, private activatedRoute: ActivatedRoute){
        this.questionToAnswer = new Question();
        this.questions = [];
        this.answers = [];
        this.approvedAnswers = [];
    }

    ngOnInit(): void {
        this.UserId = this.activatedRoute.snapshot.params['p1'];
        this.username = this.activatedRoute.snapshot.params['p2'];
        this.userType = this.activatedRoute.snapshot.params['p3'];
        this.questionId = this.activatedRoute.snapshot.params['p4'];

        this.questionService.getQuestions().subscribe((data: Question[]) => {
            console.log(data);
            this.questions = data;

            
            for (let i = 0; i < data.length; i++){
                if (data[i].id == this.questionId)
                    this.questionToAnswer = data[i]; 
            }
        })

        this.answerService.getAnswers().subscribe((data: Answer[]) => {
            console.log(data);
            this.answers = data;

            let count = 0;
            for (let i = 0; i < data.length; i++){
                if (data[i].status == "approved"){
                    this.approvedAnswers[count] = data[i];
                    count++;
                }
            }
        })
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
}