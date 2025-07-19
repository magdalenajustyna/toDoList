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
  //userValid! : User ;   //! damit es nicht gleich initialisiert werden muss

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

    let user = { email: emailVar, passwort: passwortVar };    //user Objekt zusammenstellen
    console.log('user', user); //erstellt User

    //bekomme response mit status 200 oder 401 zurück
    this.auth.loginUser(user).then((response) => {  

      //console.log("TEST STATUS", response.Status);

       if (response.message === 'Login successful') {  
         //das muss doch auch mit Status gehen??? wie kann ich diesen von dem Objekt auslesen?? 
          
          this.auth.setUser(response.token, response.user);   //FUNKTIONIERT NOCH NICHT!
          //muss user zwischenspeichern und dann in signal setzen??
          console.log('signal in auth service', response.token, response.user);
          this.router.navigate(['/home']);    // nur bei erfolgreichem Login zu Home
          
        } else if (response.message === 'Invalid email/password') {
          console.log('Login failed with status: FALSCHES PW ODER MAIL STATUS =', response.message);
          this.router.navigate(['/login']); // bei falschem PW oder Mail zurück zu Login}
        }
      })
      .catch((error) => {
        console.error('Login failed', error);
      });

    //this.router.navigate(['/home']);

    //.then(() => {   //wenn es antwort gibt, user = response und user aufschlüsseln

    //   console.log('user logged in', user); //user ausgeben
    /*    this.auth.setUser(response.token, response.user); //   //signal setzen
      console.log('signal in auth service');
    })*/

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
