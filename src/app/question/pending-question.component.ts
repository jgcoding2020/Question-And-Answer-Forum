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

export class PendingQuestionComponent implements OnInit{
    
    id = 0;
    username = "";
    userType = "";
    pendingQuestions: Question[];

    constructor(private adminService: AdminService, private questionService: QuestionService, private router: Router, private activatedRoute: ActivatedRoute){
        this.pendingQuestions = []; 
    }

    ngOnInit(): void {
        this.id = this.activatedRoute.snapshot.params['p1'];
        this.username = this.activatedRoute.snapshot.params['p2'];
        this.userType = this.activatedRoute.snapshot.params['p3'];
        
        let count = 0;
        this.questionService.getQuestions().subscribe((data: Question[]) => {
            console.log(data);
            
            for (let i = 0; i < data.length; i++){
                if (data[i].status == "Pending for approval"){
                    this.pendingQuestions[count] = data[i];
                    count++;
                }
            }
        })
    }

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
        // this.questionService.deleteQuestion(questionId).subscribe();
        // if(confirm(`Question id: ${questionId} has been removed`)) {
        //     window.location.href = `http://localhost:4200/pending-question;p1=${this.id};p2=${this.username};p3=${this.userType};`;
        // }
    }

    goPendingQuestion(){
        this.router.navigate(['pending-question', { p1: this.id, p2: this.username, p3: this.userType }]);
    }
    goPendingAnswer(){
        this.router.navigate(['pending-answer', { p1: this.id, p2: this.username, p3: this.userType }]);
    }

    goSignOut(){
        alert("You have succefully logged out");
        this.router.navigate(['home', {p1: null, p2: null, p3: null}]);
    }
}