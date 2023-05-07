import { Component } from "@angular/core";

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

// UserHomeComponent provides functionality for home template
// implemented by Joshua Gardner 
export class HomeComponent {

    // user login button click function 
    //implemented by Joshua Gardner
    goUser():string{
        return "/user-login";
    }

    // user login button click function 
    //implemented by Joshua Gardner
    goAdmin():string{
        return "/admin-sign-up";
    }
}