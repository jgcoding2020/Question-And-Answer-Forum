import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Answer } from './answer'
@Injectable({
    providedIn: 'root'
})

export class AnswerService {

    private baseUrl = "http://localhost::8080/api/answer";

    constructor(private http: HttpClient){

    }

    // adds a answer to the database
    addAnswer(answer: Answer): Observable<Answer> {
        return this.http.post<Answer>(this.baseUrl + "/add", answer);
    }

    // get all answers from the database
    getAnswers(): Observable<Answer[]> {
        return this.http.get<Answer[]>(this.baseUrl + "/all")
    }

    deleteAnswer(answerId: number): Observable<Answer>{
        return this.http.delete<Answer>(`${this.baseUrl}/delete?id=${answerId}`);
    }
}