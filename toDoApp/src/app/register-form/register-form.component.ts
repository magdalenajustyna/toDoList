import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { User } from '../shared/user';

@Component({
  selector: 'app-register-form',
  imports: [RouterLink, HeaderComponent, ReactiveFormsModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css',
})
export class RegisterFormComponent {
  private auth = inject(AuthService);
  private router = inject(Router);
  //user! : User;

  registerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),    //wird hier Mail in Korrekter Schreibweise geprüft
    passwort: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });
  hide = true;

  onSubmit() {
    const values = this.registerForm.value;    

    const nameVar = values.name!;   // dann muss auch Interface angepasst werden
    const emailVar = values.email!.toLowerCase(); 
    const passwortVar = values.passwort!;

    const user = { email: emailVar, passwort: passwortVar, name : nameVar }; //user Objekt zusammenstellen
    console.log('user RegisterFormComponent', user);

    //bekomme response true/false zurück
   this.auth.registerUser(user)
      .then((response) => {
        if (response) {
          console.log('Register erfolgreich, weiter zu Login', user);
          this.router.navigate(['/login']); // nur bei erfolgreichem Register 
         
       } else {
          console.log(
            'Register failed Mail bereits vergeben', response
          );
          this.router.navigate(['/register']); // bei falschem PW oder Mail zurück zu Login}
        } // eig nicht erneut seite aufrufen, nur Meldung über formular einblenden
      })
      .catch((error) => {
        console.error('Register failed', error);
      });
  }

  valid(): boolean {
    const check =
      !this.registerForm.controls['email'].hasError('required') &&
      !this.registerForm.controls['passwort'].hasError('required') &&
      !this.registerForm.controls['passwort'].hasError('minlength') &&
      !this.registerForm.controls['name'].hasError('required');
    console.log('valid : ', check);
    return check;
  }
}
