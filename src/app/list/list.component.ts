import { Component, inject, OnInit } from '@angular/core';
import { Todo } from '../shared/todo';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { BackendService } from '../shared/backend.service';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-list',
  standalone: true, // Code aus Skript
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent implements OnInit {
  // wenn ListComponent in Anwendung eingebunden wird, soll Service aufgerufen werden, alle Daten laden

  private dataservice = inject(BackendService);
  private router = inject(Router);
  private auth = inject(AuthService);

  toDos: Todo[] = [];
  filteredToDos: Todo[] = [];
  todo!: Todo;
  id: string | null = '';

  search = new FormControl(''); // FormControl für die Suche, initial leer

  async ngOnInit(): Promise<void> {
    // async Methode, die Promise zurückgibt
    // über authservice aktuelle userin auslesen, id speichern, um nur ToDos der userin anzuzeigen

    let userId = this.auth.user()._id;     
  
    this.toDos = await this.dataservice.getAllToDos(userId); //hier will ich die Todos der Userin 
    this.filteredToDos = this.toDos

      .filter((t) => t.status === 'offen') // nur offene Todos
      .sort((a, b) => {
        let dateA = new Date(a.datum.split('.').reverse().join('-'));
        let dateB = new Date(b.datum.split('.').reverse().join('-'));
        return dateA.getTime() - dateB.getTime();
      });
      
  }

  delete(id: string): void {
    this.dataservice.deleteOne(String(id)).then(() => {
      this.ngOnInit();
    });
  }

  filter() {
    let input = this.search.value?.toLocaleLowerCase() || ''; // ? prüft, ob null, wenn nicht, dann to lower Case

    this.filteredToDos = this.toDos.filter(
      (t) =>
        (t.todoName.toLowerCase().includes(input) ||
          t.prio.toLowerCase().includes(input)) &&
        t.status == 'offen'
    );
  }

  confirmAction(id: string) {
    const confirmed = window.confirm('Möchtest du das ToDo wirklich löschen?');
    if (confirmed) {
      this.delete(id);
      this.router.navigate(['/home']);
    }
  }

  filterPrio(prio: string): void {

    if (prio === 'alle') {
      this.ngOnInit();    
    }

    else{
      this.filteredToDos = this.toDos.filter(
        (t) =>
          t.prio.toLowerCase() === prio.toLowerCase() && t.status === 'offen'
      );
    } 
  }

  erledigt(_id: string): void {
    this.dataservice
      .getOne(_id) //holt Promise ToDo mit der ID aus Datenbank
      .then((todo) => {
        //wenn Promise vorhanden
        this.todo = todo;
        this.todo.status = 'erledigt'; //Status auf erledigt setzen
        return this.todo;
      })

      .then(() => {
        this.dataservice.update(_id, this.todo).then(() => {
          //geändertes Todo updaten
          this.ngOnInit(); // refresh der Seite
        });
      });
  }
}
