import { Injectable } from "@angular/core";
import { Question } from "./question";
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})

export class QuestionService{

    private baseUrl = "http://localhost:8080/api/questions";

    constructor(private http: HttpClient){

    }

    // gets list of all questions from database
    getQuestions():Observable<Question[]> {
        return this.http.get<Question[]>(`${this.baseUrl}` + "/getallquestion");
    }
}