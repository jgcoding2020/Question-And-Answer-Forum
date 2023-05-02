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

export class AdminService {

    private baseUrl = "http://localhost:8080/api/user";
    private questionBaseUrl = "http://localhost:8080/api/questions/approve?id=";
    private answerBaseUrl = "http://localhost:8080/api/answer/approve?id=";

    constructor(private http: HttpClient){

    }

    // gets list of all admins from database
    getAdmins():Observable<Admin[]> {
        return this.http.get<Admin[]>(`${this.baseUrl}` + "/getallusers");
    }

    // adds an admin to the database
    addAdmin(admin: Admin): Observable<Admin> {
        return this.http.post<Admin>(this.baseUrl + "/adduser", admin);
    }

    // returns admin with matching username and password from database 
    loginAdmin(login: Login): Observable<Admin> {
        return this.http.post<Admin>(this.baseUrl + "/getLogin", login);
    }

    questionApproval(status: StatusDTO, questionId: number): Observable<Question>{
        return this.http.put<Question>(this.questionBaseUrl + questionId, status);
    }

    questionRemoval(status: StatusDTO, questionId: number): Observable<Question>{
        return this.http.put<Question>(this.questionBaseUrl + questionId, status);
    }

    answerApproval(status: StatusDTO, answerId: number): Observable<Answer>{
        return this.http.put<Answer>(this.answerBaseUrl + answerId, status);
    }

    answerRemoval(status: StatusDTO, answerId: number): Observable<Answer>{
        return this.http.put<Answer>(this.answerBaseUrl + answerId, status);
    }
}