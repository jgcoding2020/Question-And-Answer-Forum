import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Chat } from './chat';

@Injectable({
    providedIn:'root'
})
export class ChatService{
    private baseUrl = "http://localhost:8080/api/chat";


    constructor(private http: HttpClient){

    }

    addChat(recipientUser: String, chatMessage: String):Observable<Chat>{
        let newChat = {
            recipient: recipientUser,
            message: chatMessage
        }

        console.log(newChat);

        return this.http.post<Chat>(`${this.baseUrl}/send`, newChat);
    }

    getAllChats():Observable<Chat[]>{
        return this.http.get<Chat[]>(`${this.baseUrl}/all`);
    }

    getMyChats():Observable<Chat[]>{
        return this.http.get<Chat[]>(`${this.baseUrl}/all`);
    }

    getTheirChats():Observable<Chat[]>{
        return this.http.get<Chat[]>(`${this.baseUrl}/all`);
    }
}