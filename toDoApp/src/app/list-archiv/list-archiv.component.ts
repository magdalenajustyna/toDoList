import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { BackendService } from '../shared/backend.service';
import { Todo } from '../shared/todo';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-archiv',
  standalone: true, //standalone aus seinem Code eingefügt
  imports: [ReactiveFormsModule, ListArchivComponent, RouterLink],
  templateUrl: './list-archiv.component.html',
  styleUrl: './list-archiv.component.css'
})
export class ListArchivComponent implements OnInit {
  // in dem Moment in dem Table Component in Anwendung eingebunden wird, soll Service aufgerufen werden
  // in dem Moment sollen alle Daten geladen werden

  private dataservice = inject(BackendService);       // Injezierung des Services
  toDos: Todo[] = [];                     // Achtung Schreibweise!!
  filteredToDos: Todo[] = [];
  todo!: Todo;

  deleteStatus: boolean = false;
  private router = inject(Router);

  search = new FormControl('');               // FormControl für die Suche, initial leer //ReactiveFormsModule muss auch in imports 

  async ngOnInit(): Promise<void>              // async Methode, die Promise zurückgibt
  {
    this.toDos = await this.dataservice.getAllToDos()
    this.filteredToDos = this.toDos
      .filter(t => t.status == "erledigt")
      .sort((a, b) => {
        let dateA = new Date(a.datum.split('.').reverse().join('-'));
        let dateB = new Date(b.datum.split('.').reverse().join('-'));
        return dateA.getTime() - dateB.getTime();
      });
    console.log('todos in list: ', this.toDos);

    // initial nur erledigte ToDos anzeigen, KI für sort Methode genutzt

    //this.filteredToDos = this.toDos;                     // initial alle Mitglieder in der Tabelle // wir wollen nur die erledigten
    //console.log('toDos in table -> ', this.toDos);
  }

  delete(id: string): void {      // funktioniert noch nicht!!!!!
    this.dataservice.deleteOne(String(id)).then(() => {
      this.dataservice
        .getAllToDos()
        .then((response) => (this.toDos = response))
        .then(() => this.router.navigate(['/archiv']));
    });

    console.log(`todo mit id=${id} löschen`);
  }

  filter() {
    let input = this.search.value?.toLocaleLowerCase() || "";           //damit Zeile 35 funktioniert // ? prüft, ob null, wenn nicht, dann to lower Case
    console.log('input: ', input);
    this.filteredToDos = this.toDos.filter(
      t => (t.todoName.toLowerCase().includes(input) ||
        t.prio.toLowerCase().includes(input)) &&
        t.status == "erledigt");
  }

  confirmAction(id: string) {
    const confirmed = window.confirm('Möchtest du das ToDo wirklich löschen?');
    if (confirmed) {
      this.delete(id);
      console.log('Aktion bestätigt!');
      this.router.navigate(['/archiv']); // refresh??!!
    } else {
      console.log('Aktion abgebrochen!');
    }
  }

  filterPrio(prio: string): void {
    console.log('ausgewählte Priorität: ', prio);
    this.filteredToDos = this.toDos.filter(
      (t) => t.prio.toLowerCase() === prio.toLowerCase() && t.status === 'erledigt'
    );
    console.log('Gefilterte ToDos:', this.filteredToDos);
  }

}
