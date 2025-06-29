import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { CreatenewtodoComponent } from './createnewtodo/createnewtodo.component';

export const routes: Routes = [
    { path: "login", component: LoginComponent },
    { path: "home", component: HomeComponent},
    { path: "register", component: RegisterFormComponent},
    { path: "**", redirectTo: "login" },
    { path: "logout", component: LoginComponent },
    { path: "createnew", component: CreatenewtodoComponent}
];
