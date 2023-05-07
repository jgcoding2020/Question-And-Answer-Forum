import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Answer } from "./answer";
import { AnswerService } from "./answer.service";
import { StatusDTO } from "../sign-up/statusDTO";
import { AdminService } from "../sign-up/admin.service";

@Component({
    selector: 'pending-answer',
    templateUrl: './pending-answer.component.html',
    styleUrls: ['./pending-answer.component.css']
})

export class PendingAnswerComponent implements OnInit {

    id = 0;
    username = "";
    userType = "";
    pendingAnswers: Answer[];

    constructor(private adminService: AdminService, private answerService: AnswerService, private router: Router, private activatedRoute: ActivatedRoute) {
        this.pendingAnswers = [];
    }

    ngOnInit(): void {
        this.id = this.activatedRoute.snapshot.params['p1'];
        this.username = this.activatedRoute.snapshot.params['p2'];
        this.userType = this.activatedRoute.snapshot.params['p3'];

        console.log("In init");
        let count = 0;
        this.answerService.getAnswers().subscribe((data: Answer[]) => {
            console.log("In subscribe");
            console.log(data);
            
            for (let i = 0; i < data.length; i++){
                if (data[i].status == "Pending approval"){
                    this.pendingAnswers[count] = data[i];
                    count++;
                }
            }
        })
    }

    approveAnswer(answerId: number){
        let status = new StatusDTO();
        status.status = "approved";
        console.log(status);
        console.log(answerId);
        this.adminService.answerApproval(status, answerId).subscribe();
        if(confirm(`Answer id: ${answerId} has been approved`)) {
            window.location.href = `http://localhost:4200/pending-answer;p1=${this.id};p2=${this.username};p3=${this.userType};`;
        }
    }

    removeAnswer(answerId: number){
        let status = new StatusDTO();
        status.status = "removed";
        console.log(status);
        console.log(answerId);
        this.adminService.answerRemoval(status, answerId).subscribe();
        if(confirm(`Answer id: ${answerId} has been removed`)) {
            window.location.href = `http://localhost:4200/pending-answer;p1=${this.id};p2=${this.username};p3=${this.userType};`;
        }

        // The currently used code only changes the status field of an Answer
        // It does not remove the Answer from the database
        // Thus, I highly suggest the use of this code
        // -- Juan David
        // this.answerService.deleteAnswer(answerId).subscribe();
        // if(confirm(`Question id: ${answerId} has been removed`)) {
        //     window.location.href = `http://localhost:4200/pending-answer;p1=${this.id};p2=${this.username};p3=${this.userType};`;
        // }
    }


    goPendingQuestion() {
        this.router.navigate(['pending-question', { p1: this.id, p2: this.username, p3: this.userType }]);
    }
    goPendingAnswer() {
        this.router.navigate(['pending-answer', { p1: this.id, p2: this.username, p3: this.userType }]);
    }

    goSignOut() {
        alert("You have succefully logged out");
        this.router.navigate(['home', { p1: null, p2: null, p3: null }]);
    }
}