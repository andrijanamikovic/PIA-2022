import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { ModeratorComponent } from './moderator/moderator.component';
import { ReaderComponent } from './reader/reader.component';
import { RegisterComponent } from './register/register.component';
import { MainComponent } from './main/main.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { ProfileComponent } from './profile/profile.component';
import { BookPageComponent } from './book-page/book-page.component';
import { ChangePassComponent } from './change-pass/change-pass.component';
import { HistoryComponent } from './history/history.component';
import { BookEditingComponent } from './book-editing/book-editing.component';
import { AddBookComponent } from './add-book/add-book.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserEditingComponent } from './user-editing/user-editing.component';
import { BookRequestsComponent } from './book-requests/book-requests.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    ModeratorComponent,
    ReaderComponent,
    RegisterComponent,
    MainComponent,
    AdminLoginComponent,
    ProfileComponent,
    BookPageComponent,
    ChangePassComponent,
    HistoryComponent,
    BookEditingComponent,
    AddBookComponent,
    EditUserComponent,
    EditBookComponent,
    UserEditingComponent,
    BookRequestsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
