import { Injectable } from '@angular/core';
import { Todo } from './todo';

@Injectable({ // injezierbar in gesamter Anwendung
  providedIn: 'root'
})
export class TodosService {

  constructor() { }

  /* getAllToDos noch anpassen, Datenbank auslesen */
  /* ich will erstmal nur die offenen to DOs
  get all ToDos für Archiv (nur erledigte)*/

  async getAllToDos(): Promise<Todo[]> {        // gibt Promise zurück, typisieren mit Datentype (Array von Interface Typ)
    let response = await fetch('/assets/todos.json'); // liest Datei aus und speichert sie in response
    console.log('response in service -> ', response);
   let todos = response.json();  // gibt gesamten Inhalt der JSAON Datei zurück (Array)
   console.log('todos in service -> ', todos);
   return todos;
}

}
