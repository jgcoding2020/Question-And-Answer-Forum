import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Question } from "../question/question";
import { QuestionService } from "../question/question.service";

@Component({
    selector: 'user-home',
    templateUrl: './user-home.component.html',
    styleUrls: ['./user-home.component.css']
})

// UserHomeComponent provides functionality for user-home template
// implemented by Joshua Gardner 
export class UserHomeComponent implements OnInit {

    // class variables for router params and services
    // implemented by Joshua Gardner 
    id = 0;
    username = "";
    userType = "";
    question: Question;
    questions: Question[];
    userQuestions: Question[];

    // class constructor
    // implemented by Joshua Gardner
    constructor(private questionService: QuestionService, private router: Router, private activatedRoute: ActivatedRoute) {
        this.question = new Question();
        this.questions = [];
        this.userQuestions = [];
    }

    ngOnInit(): void {
        // assigns params to class variables
        // implemented by Joshua Gardner
        this.id = this.activatedRoute.snapshot.params['p1'];
        this.username = this.activatedRoute.snapshot.params['p2'];
        this.userType = this.activatedRoute.snapshot.params['p3'];

        console.log(this.id);
        console.log(this.username);
        console.log(this.userType);

        // creates list of all questions from database
        // implemented by Joshua Gardner
        this.questionService.getQuestions().subscribe((data: Question[]) => {
            console.log(data);
            this.questions = data;

            // count needs to be outside of the loop
            // otherwise it will always be reset to 0 
            // and not actually print out the whole list
            let count = 0;

            // creates array of this user's questions
            // implemented by Joshua Gardner
            for (let i = 0; i < data.length; i++) {
                
                if (data[i].qcreated_by == this.username) {
                    console.log(data[i].qcreated_by == this.username);
                    this.userQuestions[count] = data[i];
                    count++;
                    console.log(count);
                }
            }
        })
    }

    // Clicking the "Show Answers" button redirects to the approved answers for the User's Created Question
    // implemented by Joshua Gardner
    // added to this component by Juan David
    showAnswers(questionId: number){
        this.router.navigate(['approved-answer', {p1: this.id, p2: this.username, p3: this.userType, p4: questionId}]);
    }

    // create question button on click function uses router navigation create-question component with params set
    // implemented by Joshua Gardner
    goCreateQuestion() {
        this.router.navigate(['create-question', { p1: this.id, p2: this.username, p3: this.userType }]);
    }

    // search question button on click function uses router navigation search-question component with params set
    // implemented by Joshua Gardner
    goSearchQuestion() {
        this.router.navigate(['search-question', { p1: this.id, p2: this.username, p3: this.userType }]);
    }

    // chat button on click function uses router navigation chat component with params set
    // implemented by Joshua Gardner
    goChat() {
        this.router.navigate(['chat', { p1: this.id, p2: this.username, p3: this.userType }]);
    }

    // sign out button on click function uses router navigation home component with params set to null
    // implemented by Joshua Gardner
    goSignOut() {
        alert("You have succefully logged out");
        this.router.navigate(['home', { p1: null, p2: null, p3: null }]);
    }
}

