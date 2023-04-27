import { Component } from "@angular/core";

@Component({
    selector: 'user-home',
    templateUrl: './user-home.component.html',
    styleUrls: ['./user-home.component.css']
})

export class UserHomeComponent {

    message: string = "This is user-home";
}