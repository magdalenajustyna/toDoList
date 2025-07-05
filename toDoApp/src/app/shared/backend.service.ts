import { Injectable } from '@angular/core';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  URL = 'http://localhost:3000'

  constructor() { }

  async getAllToDos(): Promise<Todo[]> {
    let response = await fetch(this.URL + '/todos');
    let todos = await response.json();
    console.log('todos in service (getAll) : ', todos)
    return todos;
}
}
