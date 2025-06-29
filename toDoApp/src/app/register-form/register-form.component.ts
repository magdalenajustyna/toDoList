import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { HomedummyComponent } from '../homedummy/homedummy.component';

@Component({
  selector: 'app-register-form',
  imports: [RouterLink, HeaderComponent, HomedummyComponent],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent {

}
