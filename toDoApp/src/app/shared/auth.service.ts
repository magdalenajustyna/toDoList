import { Injectable, computed, Signal, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';


@Injectable({
  providedIn: 'root',
})

export class AuthService {
  baseUrl = 'http://localhost:3000';

  user_id = '';
  user: WritableSignal<User> = signal({
    _id: '',
    email: '',
    passwort: '',
  });

  token: WritableSignal<string> = signal('');
  loggedIn: Signal<boolean> = computed(
    () => (this.user()._id && this.user()._id! != '') || false
  );

  constructor(private http: HttpClient) {}

  setUser(token: string, user: User): void {
    this.user.set(user);
    this.token.set(token);
  }

  unsetUser(): void {
    this.user.set({ _id: '', email: '', passwort: ''});
    this.token.set('');
  }

  async registerUser(user: User): Promise<any> {
   // return this.http.post(this.baseUrl + '/todos/user/register', user); // URL checken?

    let response = await fetch(this.baseUrl + '/todos/user/register', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    let user_register = await response.json();
    this.user_id = user_register._id;
    console.log('response register service', user_register);
    return user_register; 

  }

  async loginUser(user: { email: any; passwort: string }): Promise<any> {
  let response = await fetch(this.baseUrl + '/todos/user/login', {
   method: "POST",
    body: JSON.stringify(user),
    headers: {
    "Content-Type": "application/json",
    },
    
  });

  let user_login = await response.json();   //hier wird Antwort vom Endpunkt gespeichert (ist Object mit message)
  this.user_id = user_login._id;
  console.log('response login service', user_login);    // wird bei Login erreicht
  return user_login;  // eingeloggter user ()
    
  }
}
