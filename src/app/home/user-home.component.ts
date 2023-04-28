import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
    selector: 'user-home',
    templateUrl: './user-home.component.html',
    styleUrls: ['./user-home.component.css']
})

export class UserHomeComponent implements OnInit{

    message: string = "current user's name";
    currentUserId = 0;

    constructor(private route: ActivatedRoute){
        
    }

    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            console.log(params['p1']);
        });
    }
}