import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { HomedummyComponent } from '../homedummy/homedummy.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-form',
  imports: [RouterLink, HeaderComponent, HomedummyComponent, ReactiveFormsModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent {

}
