import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from './user';
import { Login } from './login';

@Injectable({
    providedIn: 'root'
})

// UserService class 
// implemented by Joshua Gardner
export class UserService {

    // base url for user service
    private baseUrl = "http://localhost:8080/api/user";

    // class constructor 
    // implemented by Joshua Gardner
    constructor(private http: HttpClient){

    }

    // gets list of all users from database
    // implemented by Joshua Gardner
    getUsers():Observable<User[]> {
        return this.http.get<User[]>(`${this.baseUrl}` + "/getallusers");
    }

    // adds a user to the database
    // implemented by Joshua Gardner
    addUser(user: User): Observable<User> {
        return this.http.post<User>(this.baseUrl + "/adduser", user);
    }

    // returns user with matching username and password from database 
    // implemented by Joshua Gardner
    loginUser(login: Login): Observable<User> {
        return this.http.post<User>(this.baseUrl + "/getLogin", login);
    }
}