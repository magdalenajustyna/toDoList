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
import { User } from '../shared/user';

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
 /* //userValid : //User ;*/

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    passwort: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });
  hide = true;

  onSubmit() {
    //const ode let variablen???

    const values = this.loginForm.value;
    let emailVar = values.email!;
    let passwortVar = values.passwort!;

    let user = { email: emailVar, passwort: passwortVar };
    console.log('user', user); //erstellt User

    this.auth.loginUser(user)
    .then((response) => {
      //this.//userValid = response;

      this.auth.setUser(response.token, response.user);
      console.log('signal in auth service', response.token, response.user );
      this.router.navigate(['/home']); 
      console.log('USER IST JETZT WIRKLICH EINGELOGGT');
    })
    .catch((error) => {
      console.error('Login failed', error);    
    })
    
    
    
    //this.router.navigate(['/home']);

    //.then(() => {   //wenn es antwort gibt, user = response und user aufschlüsseln

    //   console.log('user logged in', user); //user ausgeben
    /*    this.auth.setUser(response.token, response.user); //   //signal setzen
      console.log('signal in auth service');
    })*/
    //.then((user) => {     // wenn user eingeloggt console positiv // sonst negative
    // if (!user.email) {
    //         this.router.navigate(['/home']);
    //     } else {
    //     console.log('todo in DetailComponent : ', todo);
    // }

    //});
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
