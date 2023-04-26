import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms'; 
import { UserComponent } from './user.component';

import { HomeComponent } from './home/home.component';
import { UserLoginComponent } from './login/user-login.component';
import { AdminLoginComponent } from './admin-login.component';
import { AdminSignUpComponent } from './sign-up/admin-sign-up.component';
import { CreateQuestionComponent } from './question/create-question.component';
import { SearchQuestionComponent } from './question/search-question.component';
import { CreatedQuestionComponent } from './question/created-question.component';
import { PendingQuestionComponent } from './question/pending-quesiton.component';
import { CreatedAnswerComponent } from './answer/created-answer.component';
import { PendingAnswerComponent } from './answer/pending-answer.component';
import { ApprovedAnswerComponent } from './answer/approved-answer.component';
import { ChatComponent } from './chat/chat.component';
import { UserToUserChatComponent } from './chat/user-to-user-chat.component';
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';

@NgModule({
  declarations: [
    AppComponent, UserComponent, HomeComponent, 
    UserLoginComponent, AdminLoginComponent, AdminSignUpComponent,
    CreateQuestionComponent, SearchQuestionComponent, CreatedQuestionComponent,
    PendingQuestionComponent, CreatedAnswerComponent, PendingAnswerComponent,
    ApprovedAnswerComponent, ChatComponent, UserToUserChatComponent, NoPageFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, 
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
