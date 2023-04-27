import { Component } from "@angular/core";

@Component({
    selector: 'chat',
    templateUrl: './chat.component.html'
})

export class ChatComponent {

    message: string = "This is chat";
}