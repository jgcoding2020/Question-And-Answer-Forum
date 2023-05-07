import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { QuestionService } from "../question/question.service";
import { Question } from "../question/question";
import { Answer } from "./answer";
import { AnswerService } from "./answer.service";

@Component({
    selector: 'create-answer',
    templateUrl: './create-answer.component.html',
    styleUrls: ['./create-answer.component.css']
})

// CreateAnswerComponent provides functionality for create-answer template
// implemented by Joshua Gardner 
export class CreateAnswerComponent implements OnInit{
    
    // class variables for router params
    // implemented by Joshua Gardner
    UserId = 0;
    username = "";
    userType = "";
    questionId = 0;
    answer: Answer;
    questionToAnswer: Question;
    
    // class constructor
    // implemented by Joshua Gardner
    constructor(private answerService: AnswerService, private questionService: QuestionService, private router: Router, private activatedRoute: ActivatedRoute){
        this.questionToAnswer = new Question();
        this.answer = new Answer();
    }

    ngOnInit(): void {
        // assigns params to class variables
        // implemented by Joshua Gardner 
        this.UserId = this.activatedRoute.snapshot.params['p1'];
        this.username = this.activatedRoute.snapshot.params['p2'];
        this.userType = this.activatedRoute.snapshot.params['p3'];
        this.questionId = this.activatedRoute.snapshot.params['p4'];

        // assigns questionToAnswer class variable question that is being answered
        // implemented by Joshua Gardner
        this.questionService.getQuestions().subscribe((data: Question[]) => {
            console.log(data);
            for (let i = 0; i < data.length; i++){
                if (data[i].id == this.questionId){
                    this.questionToAnswer.datetime = data[i].datetime;
                    this.questionToAnswer.description_question = data[i].description_question;
                    this.questionToAnswer.image_src = data[i].image_src;
                    this.questionToAnswer.qapproved_by = data[i].qapproved_by;
                    this.questionToAnswer.qcreated_by = data[i].qcreated_by;
                    this.questionToAnswer.status = data[i].status;
                    this.questionToAnswer.title = data[i].title;
                    this.questionToAnswer.topic = data[i].topic;
                    this.questionToAnswer.id = data[i].id;
                }
            }
        })
    }

    // click function adds answer to question to database
    // implemented by Joshua Gardner
    onSubmitAnswer(answerQuestionForm: any){
        this.answer.datetime = "" + new Date();
        this.answer.description_answer = answerQuestionForm.value.description_answer;
        this.answer.img_src = "" + answerQuestionForm.value.img_src;
        this.answer.created_by = this.username;
        this.answer.question = this.questionToAnswer;
        console.log(this.answer);
        console.log(this.answer.img_src);
        console.log(this.answer.datetime);
        console.log(this.answer.description_answer);
        this.answerService.addAnswer(this.answer).subscribe();
        if(confirm("You have successfully submitted your answer!")) {
            window.location.href = `http://localhost:4200/create-answer;p1=${this.UserId};p2=${this.username};p3=${this.userType};p4=${this.questionId}`;
        }
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
