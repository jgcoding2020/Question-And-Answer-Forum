import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: 'admin-home',
    templateUrl: './admin-home.component.html',
    styleUrls: ['./admin-home.component.css']
})

export class AdminHomeComponent implements OnInit{
    
    id = 0;
    username = "";
    userType = "";

    constructor(private router: Router, private activatedRoute: ActivatedRoute){

    }

    ngOnInit(): void {
        this.id = this.activatedRoute.snapshot.params['p1'];
        this.username = this.activatedRoute.snapshot.params['p2'];
        this.userType = this.activatedRoute.snapshot.params['p3'];
        //this.currentUserId = this.activatedRoute.snapshot.paramMap.get('p1');
        /* this.activatedRoute.params.subscribe(params => {
            console.log(params['p1']);
        }); */
        console.log(this.id);
        console.log(this.username);
        console.log(this.userType);
    }

}