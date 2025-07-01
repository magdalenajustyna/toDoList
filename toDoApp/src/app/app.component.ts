import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegisterFormComponent } from './register-form/register-form.component';
import { DeleteComponent } from './delete/delete.component';
import { ArchivbuttonComponent } from './archivbutton/archivbutton.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { CreatenewtodoComponent } from './createnewtodo/createnewtodo.component';
import { NewtodobuttonComponent } from './newtodobutton/newtodobutton.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RegisterFormComponent, DeleteComponent, ArchivbuttonComponent,
            LoginComponent, HeaderComponent, HomeComponent, ListComponent, CreatenewtodoComponent, NewtodobuttonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'toDoApp';
}
