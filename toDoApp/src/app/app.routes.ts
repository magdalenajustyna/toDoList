import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { CreatenewtodoComponent } from './createnewtodo/createnewtodo.component';
import { ArchivComponent } from './archiv/archiv.component';
import { UpdateComponent } from './update/update.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterFormComponent },
  { path: 'logout', component: LoginComponent },
  { path: 'create', component: CreatenewtodoComponent },
  { path: 'archiv', component: ArchivComponent },
  { path: 'todo/:id', component: UpdateComponent },
  { path: 'user/:id', component: LoginComponent },
  //{ path: 'homeNew', component: HomeComponent, data: { onSameUrlNavigation: 'reload'} },
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }, // dieser Pfad muss offenbar unten stehen!
];
