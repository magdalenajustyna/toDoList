import { Injectable, computed, Signal, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    name: '',
  });

  token: WritableSignal<string> = signal('');
  loggedIn: Signal<boolean> = computed(() => (this.user()._id != '') || false );


  constructor() {}

  setUser(token: string, user: User): void {
    this.user.set(user);
    this.token.set(token);
  }

  unsetUser(): void {
    this.user.set({ _id: '', email: '', passwort: '', name: '' }); //Namen hinzugefügt
    this.token.set('');
    console.log('User unset in AuthService', this.user);
  }

  async registerUser(user: {
    email: any;
    passwort: string;
    name: string;
  }): Promise<boolean> {
    let response = await fetch(this.baseUrl + '/todos/user/register', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status == 201) {
      let user_registered = await response.json(); //hier wird Antwort vom Endpunkt gespeichert//Body aus request wird ausgelesen

      console.log('response REGISTER service', user_registered); // wird bei Register erreicht

      return true;
    } else {
      return false;
    }
  }

  async loginUser(user: { email: any; passwort: string }): Promise<boolean> {
    let response = await fetch(this.baseUrl + '/todos/user/login', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status == 200) {
      let user_login = await response.json(); //hier wird Antwort vom Endpunkt gespeichert
      //this.user_id = user_login._id;
      console.log('response login service', user_login); // wird bei Login erreicht
      console.log('loggedIn richtig ermittlet?', this.loggedIn);

      this.setUser(user_login.token, user_login.user); // User und Token setzen
      return true;
    } else {
      return false;
    }
  }
}
