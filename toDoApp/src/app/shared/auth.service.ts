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

  registerUser(user: User): Observable<any> {
    return this.http.post(this.baseUrl + '/todos/user/register', user); // URL checken?
  }

  async loginUser(user: { email: any; passwort: string }): Promise<any> {
  let response = await fetch(this.baseUrl + '/todos/user/login', {
   method: "POST",
    body: JSON.stringify(user),
    headers: {
    "Content-Type": "application/json",
    },
    
  });
   let user_login = await response.json();
  this.user_id = user_login._id;
  console.log('response login service', user_login);
  return user_login;  
    
  }
}
