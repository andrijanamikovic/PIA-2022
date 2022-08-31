import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { ModeratorComponent } from './moderator/moderator.component';
import { ReaderComponent } from './reader/reader.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  {path: "", component: MainComponent},
  {path: "login", component: LoginComponent},
  {path:"admin", component: AdminComponent},
  {path:"moderator", component: ModeratorComponent},
  {path:"reader", component: ReaderComponent},
  {path:"register", component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
