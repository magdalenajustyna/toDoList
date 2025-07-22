import { Component, inject, OnInit } from '@angular/core';
import { Todo } from '../shared/todo';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { BackendService } from '../shared/backend.service';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-list',
  standalone: true, // Code aus Skript
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})

export class ListComponent implements OnInit {
  // in dem Moment, in dem ListComponent in Anwendung eingebunden wird, soll Service aufgerufen werden
  // in dem Moment sollen alle Daten geladen werden

  private dataservice = inject(BackendService);
  private router = inject(Router);
  
  toDos: Todo[] = [];
  filteredToDos: Todo[] = [];
  todo!: Todo;
  id: string | null = '';


  deleteStatus: boolean = false; //nutzen wir das? eig nicht?

  search = new FormControl(''); // FormControl für die Suche, initial leer

  async ngOnInit(): Promise<void> {
    // async Methode, die Promise zurückgibt
   
    this.toDos = await this.dataservice.getAllToDos();
    this.filteredToDos = this.toDos
      .filter((t) => t.status == 'offen')
      .sort((a, b) => {
        let dateA = new Date(a.datum.split('.').reverse().join('-'));
        let dateB = new Date(b.datum.split('.').reverse().join('-'));
        return dateA.getTime() - dateB.getTime();
      });
    console.log('todos in list: ', this.toDos);
  }

  delete(id: string): void {
    this.dataservice.deleteOne(String(id)).then(() => {
      this.ngOnInit();
    });

    console.log(`Todo mit id=${id} löschen`);
  }


  filter() {
    let input = this.search.value?.toLocaleLowerCase() || ''; // ? prüft, ob null, wenn nicht, dann to lower Case
    console.log('input: ', input);
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
      console.log('Aktion bestätigt!');
      this.router.navigate(['/home']); 
    } else {
      console.log('Aktion abgebrochen!');
    }
  }

  filterPrio(prio: string): void {
    console.log('ausgewählte Priorität: ', prio);
    this.filteredToDos = this.toDos.filter(
      (t) => t.prio.toLowerCase() === prio.toLowerCase() && t.status === 'offen'
    );
    console.log('Gefilterte ToDos:', this.filteredToDos);
  }

  erledigt(_id: string): void {
    this.dataservice
      .getOne(_id)                //holt Promise ToDo mit der ID aus Datenbank
      .then((todo) => {           //wenn Promise vorhanden
        this.todo = todo;
        this.todo.status = 'erledigt'; //Status auf erledigt setzen
        return this.todo;
      })

      .then(() => {
        this.dataservice.update(_id, this.todo).then(() => {  //geändertes Todo updaten
          this.ngOnInit(); // refresh der Seite
        });
      });

    // Auswahl Radiobutton muss noch aufgehoben werden 
  }
}