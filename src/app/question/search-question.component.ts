import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Question } from "./question";
import { QuestionService } from "./question.service";

@Component({
    selector: 'search-question',
    templateUrl: './search-question.component.html',
    styleUrls: ['./search-question.component.css']
})

export class SearchQuestionComponent implements OnInit{
    
    UserId = 0;
    username = "";
    userType = "";
    questions: Question[];
    approvedQuestions: Question[];
    searchToggle = false;
    topic: string;
    searchQuestion: string;
    searchResult: Question[];
    selectedTopic: string;
    
    constructor(private router: Router, private activatedRoute: ActivatedRoute, private questionService: QuestionService){
        this.questions = [];
        this.topic = "";
        this.searchQuestion = "";
        this.searchResult = [];
        this.selectedTopic = "";
        this.approvedQuestions = [];
    }

    ngOnInit(): void {
        this.UserId = this.activatedRoute.snapshot.params['p1'];
        this.username = this.activatedRoute.snapshot.params['p2'];
        this.userType = this.activatedRoute.snapshot.params['p3'];

        // lists all questions from database on search page
        let count = 0;
        this.questionService.getQuestions().subscribe((data: Question[]) => {
            console.log(data);
            this.questions = data;

            for (let i = 0; i < data.length; i++){
                if (data[i].status == "approved"){
                    this.approvedQuestions[count] = data[i];
                    count++;
                }
            }
        })

    }

    //finds matches to question topics search in database
    onSubmitSearch(searchQuestionForm: any){
        this.searchToggle = true;
        let count = 0;
        this.searchResult = [];
        for (let i = 0; i < this.approvedQuestions.length; i++){
            
            if (this.approvedQuestions[i].topic.toLowerCase() == searchQuestionForm.value.topic.toLowerCase()){
                this.searchResult[count] = this.approvedQuestions[i];
                count++;
            }
        }   
    }

    goCreateAnswer(questionId: number){
        this.router.navigate(['create-answer', {p1: this.UserId, p2: this.username, p3: this.userType, p4: questionId}]);
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