import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBookComponent } from './add-book/add-book.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminComponent } from './admin/admin.component';
import { BookEditingComponent } from './book-editing/book-editing.component';
import { BookPageComponent } from './book-page/book-page.component';
import { ChangePassComponent } from './change-pass/change-pass.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { HistoryComponent } from './history/history.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { ModeratorComponent } from './moderator/moderator.component';
import { ProfileComponent } from './profile/profile.component';
import { ReaderComponent } from './reader/reader.component';
import { RegisterComponent } from './register/register.component';
import { UserEditingComponent } from './user-editing/user-editing.component';


const routes: Routes = [
  {path: "", component: MainComponent},
  {path: "login", component: LoginComponent},
  {path:"admin", component: AdminComponent},
  {path:"moderator", component: ModeratorComponent},
  {path:"reader", component: ReaderComponent},
  {path:"register", component: RegisterComponent},
  {path: "adminlogin", component: AdminLoginComponent},
  {path: "profile", component: ProfileComponent},
  {path: "book", component: BookPageComponent},
  {path: "change", component: ChangePassComponent},
  {path: "history", component: HistoryComponent},
  {path: "editBook", component: BookEditingComponent},
  {path: "addBook", component: AddBookComponent},
  {path: "adminEditBooks", component: EditBookComponent},
  {path: "adminEditUsers", component: EditUserComponent},
  {path: "userEditing", component: UserEditingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
