import { Component } from "@angular/core";

@Component({
    selector: 'admin-home',
    templateUrl: './admin-home.component.html',
    styleUrls: ['./admin-home.component.css']
})

export class AdminHomeComponent {

    message: string = "This is admin-home";
}