import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Question } from "./question";
import { QuestionService } from "./question.service";

@Component({
    selector: 'create-question',
    templateUrl: './create-question.component.html',
    styleUrls: ['./create-question.component.css']
})

export class CreateQuestionComponent implements OnInit{

    UserId = 0;
    username = "";
    userType = "";
    question: Question;
    questions: Question[];
    
   
    constructor(private questionService: QuestionService, private router: Router, private activatedRoute: ActivatedRoute){
        this.question = new Question();
        this.questions = [];
    }

    ngOnInit(): void {
        this.UserId = this.activatedRoute.snapshot.params['p1'];
        this.username = this.activatedRoute.snapshot.params['p2'];
        this.userType = this.activatedRoute.snapshot.params['p3'];
        
        this.questionService.getQuestions().subscribe((data: Question[])=>{
            console.log(data);
            this.questions = data;
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
        this.router.navigate(['home', {p1: null, p2: null, p3: null}]);
    }

    onSubmitCreateQuestion(questionForm: any){
    }
}