import { Component } from "@angular/core";

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent {

    goUser():string{
        return "/user-login";
    }

    goAdmin():string{
        return "/admin-sign-up";
    }
}