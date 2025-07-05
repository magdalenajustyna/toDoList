import { Injectable } from '@angular/core';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  URL = 'http://localhost:3000'

  constructor() { }

  //get all
  async getAllToDos(): Promise<Todo[]> {
    let response = await fetch(this.URL + '/todos');
    let todos = await response.json();
    console.log('todos in service (getAll) : ', todos)
    return todos;
}

// get one
async getOne(id: string): Promise<Todo> {
  let response = await fetch(this.URL + '/todos/' + id);
  let todo = await response.json();
  console.log('todo in service (getOne) : ', todo)
  return todo;
}

//update one

// delete one
async deleteOne(id: string): Promise<{message: string}> {
  let response = await fetch(this.URL + '/todos/' + id, {
    method: "DELETE"
  });
  let message = await response.json();
  console.log('message in service (deleteOne) : ', message)
  return message;
}

}
