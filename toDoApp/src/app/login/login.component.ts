import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { RouterLink, Router } from '@angular/router';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent, RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    passwort: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });
  hide = true;

  onSubmit() {
    const values = this.loginForm.value;
    const emailVar = values.email!.toLowerCase();
    const passwortVar = values.passwort!;

    const user = { email: emailVar, passwort: passwortVar }; //user Objekt zusammenstellen // gibt es hier Problem mit dem Namen?

    //bekomme response true/false zurück
    this.auth
      .loginUser(user)
      .then((response) => {
        if (response) {
          this.router.navigate(['/home']); // nur bei erfolgreichem Login zu Home
        } else {
          console.log(
            'Login failed with status: FALSCHES PW ODER MAIL STATUS =',
            response
          );
          this.router.navigate(['/login']); // bei falschem PW oder Mail zurück zu Login}
        } // eig nicht erneut seite aufrufen, nur Meldung über formular einblenden
      })
      .catch((error) => {
        console.error('Login failed', error);
      });
  }

  valid(): boolean {
    const check =
      !this.loginForm.controls['email'].hasError('required') &&
      !this.loginForm.controls['passwort'].hasError('required') &&
      !this.loginForm.controls['passwort'].hasError('minlength');
    console.log('valid : ', check);
    return check;
  }
}
