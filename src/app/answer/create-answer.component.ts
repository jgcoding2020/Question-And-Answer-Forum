import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { QuestionService } from "../question/question.service";
import { Question } from "../question/question";
import { Answer } from "./answer";
import { AnswerService } from "./answer.service";

@Component({
    selector: 'created-answer',
    templateUrl: './create-answer.component.html',
    styleUrls: ['./create-answer.component.css']
})

export class CreateAnswerComponent implements OnInit{
    
    UserId = 0;
    username = "";
    userType = "";
    questionId = 0;
    answer: Answer;
    questionToAnswer: Question;
    
    constructor(private answerService: AnswerService, private questionService: QuestionService, private router: Router, private activatedRoute: ActivatedRoute){
        this.questionToAnswer = new Question();
        this.answer = new Answer();
    }

    ngOnInit(): void {
        this.UserId = this.activatedRoute.snapshot.params['p1'];
        this.username = this.activatedRoute.snapshot.params['p2'];
        this.userType = this.activatedRoute.snapshot.params['p3'];
        this.questionId = this.activatedRoute.snapshot.params['p4'];

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
                }
            }
        })
    }

    onSubmitAnswer(answerQuestionForm: any){
        this.answer.datetime = "" + new Date();
        this.answer.description_answer = answerQuestionForm.value.description_answer;
        this.answer.img_src = "" + answerQuestionForm.value.img_src;

        console.log(this.answer);
        console.log(typeof this.answer.img_src);
        console.log(typeof this.answer.datetime);
        console.log(typeof this.answer.description_answer);
        this.answerService.addAnswer(this.answer).subscribe();
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
