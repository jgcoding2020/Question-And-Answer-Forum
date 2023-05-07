// AnswerService implementation by Joshua Gardner

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Answer } from './answer'

@Injectable({
    providedIn: 'root'
})

// AnswerService class 
// implemented by Joshua Gardner
export class AnswerService {

    // base url to answer REST API
    // Joshua Gardner
    private baseUrl = "http://localhost:8080/api/answer";

    // AnswerService class constructor
    // Joshua Gardner
    constructor(private http: HttpClient){

    }

    // http rquest to add an answer to the database
    // Joshua Gardner
    addAnswer(answer: Answer): Observable<Answer> {
        return this.http.post<Answer>(this.baseUrl + "/add", answer);
    }

    // http request to get all answers from the database
    // Joshua Gardner
    getAnswers(): Observable<Answer[]> {
        return this.http.get<Answer[]>(this.baseUrl + "/all")
    }

    // http request to delete an answer from the db
    // Joshua Gardner
    deleteAnswer(answerId: number): Observable<Answer>{
        return this.http.delete<Answer>(`${this.baseUrl}/delete?id=${answerId}`);
    }

    updateAnswer(updates: Answer, id: number): Observable<Answer>{
        return this.http.put<Answer>(`${this.baseUrl}/update?id=${id}`, updates);
    }
}