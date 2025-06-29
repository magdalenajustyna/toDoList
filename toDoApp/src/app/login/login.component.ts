import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { RouterLink } from '@angular/router';
import { CreatenewtodoComponent } from '../createnewtodo/createnewtodo.component';

@Component({
  selector: 'app-login',
  imports: [HeaderComponent, RouterLink, CreatenewtodoComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

}


