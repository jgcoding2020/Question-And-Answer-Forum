import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Admin } from './admin';
import { Login } from './login';
import { StatusDTO } from './statusDTO';
import { Question } from '../question/question';
import { Answer } from '../answer/answer';

@Injectable({
    providedIn: 'root'
})

/* AdminService class implemented by Joshua Gardner */
export class AdminService {

    // base urls to user, answer, and question api
    private baseUrl = "http://localhost:8080/api/user";
    private questionBaseUrl = "http://localhost:8080/api/questions/approve?id=";
    private answerBaseUrl = "http://localhost:8080/api/answer/approve?id=";

    constructor(private http: HttpClient){

    }

    // gets list of all admins from database
    // implemented by Joshua Gardner
    getAdmins():Observable<Admin[]> {
        return this.http.get<Admin[]>(`${this.baseUrl}` + "/getallusers");
    }

    // adds an admin to the database
    // implemented by Joshua Gardner
    addAdmin(admin: Admin): Observable<Admin> {
        return this.http.post<Admin>(this.baseUrl + "/adduser", admin);
    }

    // returns admin with matching username and password from database 
    // implemented by Joshua Gardner
    loginAdmin(login: Login): Observable<Admin> {
        return this.http.post<Admin>(this.baseUrl + "/getLogin", login);
    }

    // returns Question with status "approved"
    // implemented by Joshua Gardner
    questionApproval(status: StatusDTO, questionId: number): Observable<Question>{
        return this.http.put<Question>(this.questionBaseUrl + questionId, status);
    }

    // returns Question with status "removed"
    // implemented by Joshua Gardner
    questionRemoval(status: StatusDTO, questionId: number): Observable<Question>{
        return this.http.put<Question>(this.questionBaseUrl + questionId, status);
    }

    // returns answer with status "approved"
    // implemented by Joshua Gardner
    answerApproval(status: StatusDTO, answerId: number): Observable<Answer>{
        return this.http.put<Answer>(this.answerBaseUrl + answerId, status);
    }

    // returns answer with status "removed"
    // implemented by Joshua Gardner
    answerRemoval(status: StatusDTO, answerId: number): Observable<Answer>{
        return this.http.put<Answer>(this.answerBaseUrl + answerId, status);
    }
}