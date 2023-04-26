import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable({
    providedIn: 'root'
})

export class UserService {

    private baseUrl = "http://localhost:8080/api/user";

    constructor(private http: HttpClient){

    }

    getUsers():Observable<User[]> {
        return this.http.get<User[]>(`${this.baseUrl}` + "/get");
    }

    addUser(user: User): Observable<User> {
        return this.http.post<User>(this.baseUrl + "/post", user);
    }
}