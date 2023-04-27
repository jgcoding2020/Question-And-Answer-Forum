import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from './user';
import { Login } from './login';

@Injectable({
    providedIn: 'root'
})

export class UserService {

    private baseUrl = "http://localhost:8080/api/user";

    constructor(private http: HttpClient){

    }

    // gets list of all users from database
    getUsers():Observable<User[]> {
        return this.http.get<User[]>(`${this.baseUrl}` + "/getallusers");
    }

    // adds a user to the database
    addUser(user: User): Observable<User> {
        return this.http.post<User>(this.baseUrl + "/adduser", user);
    }

    // returns user with matching username and password from database 
    loginUser(login: Login): Observable<User> {
        return this.http.post<User>(this.baseUrl + "/getLogin", login);
    }
}