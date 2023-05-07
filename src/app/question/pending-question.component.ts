import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Question } from "./question";
import { QuestionService } from "./question.service";
import { AdminService } from "../sign-up/admin.service";
import { StatusDTO } from "../sign-up/statusDTO";

@Component({
    selector: 'pending-question',
    templateUrl: './pending-question.component.html',
    styleUrls: ['./pending-question.component.css']
})

// PendingQuestionComponent provides functionality for pending-question template
// implemented by Joshua Gardner 
export class PendingQuestionComponent implements OnInit{
    
    // class variables for router params and services
    // implemented by Joshua Gardner 
    id = 0;
    username = "";
    userType = "";
    pendingQuestions: Question[];

    // class constructor 
    // implemented by Joshua Gardner 
    constructor(private adminService: AdminService, private questionService: QuestionService, private router: Router, private activatedRoute: ActivatedRoute){
        this.pendingQuestions = []; 
    }

    ngOnInit(): void {
        // assigns params to class variables
        // implemented by Joshua Gardner
        this.id = this.activatedRoute.snapshot.params['p1'];
        this.username = this.activatedRoute.snapshot.params['p2'];
        this.userType = this.activatedRoute.snapshot.params['p3'];
        
        let count = 0;
        // creates list of all questions from database on search page
        // implemented by Joshua Gardner
        this.questionService.getQuestions().subscribe((data: Question[]) => {
            console.log(data);
            
            // creates array of questions with status "Pending for approval"
            // implemented by Joshua Gardner
            for (let i = 0; i < data.length; i++){
                if (data[i].status == "Pending for approval"){
                    this.pendingQuestions[count] = data[i];
                    count++;
                }
            }
        })
    }

    // function that allows admin to approve a question to be viewed by users 
    // implemented by Joshua Gardner
    approveQuestion(questionId: number){
        let status = new StatusDTO();
        status.status = "approved";
        console.log(status);
        console.log(questionId);
        this.adminService.questionApproval(status, questionId).subscribe();
        if(confirm(`Question id: ${questionId} has been approved`)) {
            window.location.href = `http://localhost:4200/pending-question;p1=${this.id};p2=${this.username};p3=${this.userType};`;
        }
    }

    // function that allows admin to reject a question from being viewed by users
    // implemented by Joshua Gardner
    removeQuestion(questionId: number){
        let status = new StatusDTO();
        status.status = "removed";
        console.log(status);
        console.log(questionId);
        this.adminService.questionRemoval(status, questionId).subscribe();
        if(confirm(`Question id: ${questionId} has been removed`)) {
            window.location.href = `http://localhost:4200/pending-question;p1=${this.id};p2=${this.username};p3=${this.userType};`;
        }

        // The currently used code only changes the status field of a Question
        // It does not remove the Question from the database
        // Thus, I highly suggest the use of this code
        // -- Juan David
        // -- Note to Juan, , I would
        // prefer to maintain removed (rejected) questions in the database
        // for the purpose of record keeping and usage of the question
        // variable status "remove" to notify the creator of the question's removal
        // Thank you. 
        // this.questionService.deleteQuestion(questionId).subscribe();
        // if(confirm(`Question id: ${questionId} has been removed`)) {
        //     window.location.href = `http://localhost:4200/pending-question;p1=${this.id};p2=${this.username};p3=${this.userType};`;
        // }
    }

    // pending question button on click function uses router navigation to pending-question component with params set
    // implemented by Joshua Gardner
    goPendingQuestion(){
        this.router.navigate(['pending-question', { p1: this.id, p2: this.username, p3: this.userType }]);
    }

    // pending answer button on click function uses router navigation to pending-answer component with params set
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