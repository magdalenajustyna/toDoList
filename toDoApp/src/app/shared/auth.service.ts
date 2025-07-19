import { Injectable, computed, Signal, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = 'http://localhost:3000';
  id = '';
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

async loginUser(user: { email: string, passwort: string}): Promise<any> {

  let response = await fetch(this.baseUrl + '/todos/user/login', {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json',
    },
    
  });
  let body = await response.json();
  this.id = body.user._id;
  console.log('response login service', this.id);
  } 


  registerUser(user: User): Observable<any> {
    return this.http.post(this.baseUrl + '/todos/user/register', user); // URL checken?
  }

  //loginUser(user: { email: any; passwort: string }): Observable<any> {
    //return this.http.post(this.baseUrl + '/todos/user/login', user); //URL checken?
  //}
}
