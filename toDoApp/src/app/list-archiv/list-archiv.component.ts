import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { BackendService } from '../shared/backend.service';
import { Todo } from '../shared/todo';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-archiv',
  standalone: true, //standalone aus seinem Code eingefügt
  imports: [ReactiveFormsModule],
  templateUrl: './list-archiv.component.html',
  styleUrl: './list-archiv.component.css',
})

export class ListArchivComponent implements OnInit {
  // in dem Moment, in dem ListArchivComponent in Anwendung eingebunden wird, soll Service aufgerufen werden
  // in dem Moment sollen alle Daten geladen werden

  private dataservice = inject(BackendService); // Injezierung des Services
  toDos: Todo[] = [];
  filteredToDos: Todo[] = [];
  todo!: Todo;

  private router = inject(Router);

  search = new FormControl(''); // FormControl für die Suche, initial leer

  async ngOnInit(): Promise<void> { // async Methode, die Promise zurückgibt
    this.toDos = await this.dataservice.getAllToDos();
    this.filteredToDos = this.toDos
      .filter((t) => t.status == 'erledigt')
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
  }

  filter() {
    let input = this.search.value?.toLocaleLowerCase() || ''; //damit Zeile 35 funktioniert // ? prüft, ob null, wenn nicht, dann to lower Case
    console.log('input: ', input);
    this.filteredToDos = this.toDos.filter(
      (t) =>
        (t.todoName.toLowerCase().includes(input) ||
          t.prio.toLowerCase().includes(input)) &&
        t.status == 'erledigt'
    );
  }

  confirmAction(id: string) {
    const confirmed = window.confirm('Möchtest du das ToDo wirklich löschen?');
    if (confirmed) {
      this.delete(id);
      console.log('Aktion bestätigt!');
      this.router.navigate(['/archiv']);
    } else {
      console.log('Aktion abgebrochen!');
    }
  }

  filterPrio(prio: string): void {
    console.log('ausgewählte Priorität: ', prio);
    this.filteredToDos = this.toDos.filter(
      (t) =>
        t.prio.toLowerCase() === prio.toLowerCase() && t.status === 'erledigt'
    );
    console.log('Gefilterte ToDos:', this.filteredToDos);
  }

  nochZuErledigen(_id: string): void {
    this.dataservice
      .getOne(_id) //holt Promise ToDo mit der ID aus Datenbank
      .then((todo) => {
        //wenn Promise vorhanden
        this.todo = todo;
        this.todo.status = 'offen'; //Status wieder auf offen setzen
        return this.todo;
      })

      .then(() => {
        this.dataservice.update(_id, this.todo).then(() => {
          //geändertes Todo updaten
          this.ngOnInit(); // refresh der Seite
        });
      });

    // Auswahl Radiobutton muss noch aufgehoben werden
  }
}
