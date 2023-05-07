import { Injectable } from "@angular/core";
import { Question } from "./question";
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { QuestionDTO } from "./questionDTO";

@Injectable({
    providedIn: 'root'
})

// QuestionService class implemented by Joshua Gardner
// implemented by Joshua Gardner
export class QuestionService{

    // base url for question service
    // implemented by Joshua Gardner
    private baseUrl = "http://localhost:8080/api/questions";

    // class constructor
    // implemented by Joshua Gardner
    constructor(private http: HttpClient){

    }

    // gets list of all questions from database
    // implemented by Joshua Gardner
    getQuestions():Observable<Question[]> {
        return this.http.get<Question[]>(`${this.baseUrl}` + "/getallquestion");
    }

    // adds question to database
    // implemented by Joshua Gardner
    addQuestion(questionDTO: QuestionDTO):Observable<QuestionDTO> {
        return this.http.post<QuestionDTO>(this.baseUrl + "/addquestion", questionDTO);
    }

    // searches database for questions
    // implemented by Joshua Gardner
    // modified by Juan David to include searches based on key words from question title
    searchQuestion(search: String, topic: String):Observable<Question[]>{
        return this.http.get<Question[]>(`${this.baseUrl}/search?search=${search}&topic=${topic}`);
    }
    // implemented by Joshua Gardner
    deleteQuestion(id: number):Observable<Question>{
        return this.http.delete<Question>(`${this.baseUrl}/delete?id=${id}`);
    }
}