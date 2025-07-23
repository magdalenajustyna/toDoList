import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-register-form',
  imports: [RouterLink, HeaderComponent, ReactiveFormsModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css',
})
export class RegisterFormComponent {
  private auth = inject(AuthService);
  private router = inject(Router);
  registerFailed = false;
  registered = false;

  registerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    passwort: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });
  hide = true;

  onSubmit() {
    const values = this.registerForm.value;

    const nameVar = values.name!;
    const emailVar = values.email!.toLowerCase();
    const passwortVar = values.passwort!;

    const user = { email: emailVar, passwort: passwortVar, name: nameVar }; //user Objekt zusammenstellen

    //bekomme response true/false zurück
    this.auth
      .registerUser(user)
      .then((response) => {
        if (response) {
          this.router.navigate(['/register']); // nur bei erfolgreichem Register
          this.registered = true;
        } else {
          this.registerFailed = true;
        }
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

    return check;
  }
}
