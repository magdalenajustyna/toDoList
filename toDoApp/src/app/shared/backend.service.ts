import { Injectable } from '@angular/core';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  user_id: string ='';

  URL = 'http://localhost:3000';

  constructor() { }





  //get all
  async getAllToDos(): Promise<Todo[]> {
    let response = await fetch(this.URL + '/todos/todo');
    let todos = await response.json();
    console.log('todos in service (getAll) : ', todos)
    return todos;
}

// get one
async getOne(id: string): Promise<Todo> {
  let response = await fetch(this.URL + '/todos/todo/' + id);
  let todo = await response.json();
  console.log('todo in service (getOne) : ', todo)
  return todo;
}

//update one
async update(id: string, updateData: Todo): Promise<Todo> {
  let response = await fetch(this.URL + '/todos/todo/' + id, {
    method: "PATCH",      // Achtung, muss genau so heißen wie in Backend !
    body: JSON.stringify(updateData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  let todo = await response.json();
  console.log('todo in service (update) : ', todo)
  return todo; 
}

//post one
async create(newData: Todo): Promise<Todo> {
  let response = await fetch(this.URL + '/todos/todo', {
    method: "POST",      // Achtung, muss genau so heißen wie in Backend !
    body: JSON.stringify(newData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  let todo = await response.json();
  console.log('todo in service (create) : ', todo)
  return todo; 
}


// delete one
async deleteOne(id: string): Promise<{message: number}> {

  let response = await fetch(this.URL + '/todos/todo/' + id, {
    method: "DELETE"
  });
  let status = await response.status;
  let message = { message : status}
  console.log('message in service (deleteOne) : ', message)
  return message;
}

}
