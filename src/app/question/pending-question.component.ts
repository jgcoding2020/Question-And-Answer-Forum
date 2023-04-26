import { Component } from "@angular/core";

@Component({
    selector: 'pending-question',
    templateUrl: './pending-question.component.html'
})
export class PendingQuestionComponent {

    message: string = "This is pending-question";
}