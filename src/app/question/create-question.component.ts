import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Question } from "./question";
import { QuestionService } from "./question.service";
import { QuestionDTO } from "./questionDTO";

@Component({
    selector: 'create-question',
    templateUrl: './create-question.component.html',
    styleUrls: ['./create-question.component.css']
})

// CreateQuestionComponent provides functionality for create-question template
// implemented by Joshua Gardner 
export class CreateQuestionComponent implements OnInit{

    // class variables for router params and services
    // implemented by Joshua Gardner 
    UserId = 0;
    username = "";
    userType = "";
    question: Question;
    questions: Question[];
    questionDTO: QuestionDTO;
    
    // class constructor
    // implemented by Joshua Gardner
    constructor(private questionService: QuestionService, private router: Router, private activatedRoute: ActivatedRoute){
        this.questionDTO = new QuestionDTO();
        this.question = new Question();
        this.questions = [];
    }

    ngOnInit(): void {
        // assigns params to class variables
        // implemented by Joshua Gardner
        this.UserId = this.activatedRoute.snapshot.params['p1'];
        this.username = this.activatedRoute.snapshot.params['p2'];
        this.userType = this.activatedRoute.snapshot.params['p3'];
        
        // creates list of all questions from database
        // implemented by Joshua Gardner
        this.questionService.getQuestions().subscribe((data: Question[])=>{
            console.log(data);
            this.questions = data;
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
        this.router.navigate(['user-home', {p1: null, p2: null, p3: null}]);
        alert("You have succefully logged out");
        this.router.navigate(['home', {p1: null, p2: null, p3: null}]);
    }

    // create question submit button click function sends question to database
    // implemented by Joshua Gardner
    onSubmitCreateQuestion(questionForm: any){
        this.questionDTO.title = questionForm.value.title;
        this.questionDTO.description_question = questionForm.value.description;
        this.questionDTO.image_src = questionForm.value.image;
        this.questionDTO.datetime = "" + new Date();
        this.questionDTO.topic = questionForm.value.topic;
        this.questionService.addQuestion(this.questionDTO).subscribe();
        alert(`You have successfully added a question to be answered!!!`)
    }

    refresh()
    {
        window.location.reload();
    }
}