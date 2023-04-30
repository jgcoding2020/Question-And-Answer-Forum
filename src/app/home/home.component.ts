import { Component } from "@angular/core";

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent {

    message: string = "This is application home page";

    goUser():string{
        return "/user-login";
    }

    goAdmin():string{
        return "/admin-sign-up";
    }
}