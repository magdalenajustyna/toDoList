import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateComponent } from '../update/update.component';

@Component({
  selector: 'app-login',
  imports: [HeaderComponent, RouterLink, ReactiveFormsModule, UpdateComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

}


