import { Injectable } from "@angular/core";
import { Question } from "./question";
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { QuestionDTO } from "./questionDTO";

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

    addQuestion(questionDTO: QuestionDTO):Observable<QuestionDTO> {
        return this.http.post<QuestionDTO>(this.baseUrl + "/addquestion", questionDTO);
    }

    searchQuestion(search: String, topic: String):Observable<Question[]>{
        return this.http.get<Question[]>(`${this.baseUrl}/search?search=${search}&topic=${topic}`);
    }
}