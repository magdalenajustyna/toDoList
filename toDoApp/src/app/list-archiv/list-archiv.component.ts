import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { BackendService } from '../shared/backend.service';
import { Todo } from '../shared/todo';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-list-archiv',
  standalone: true, //standalone aus seinem Code eingefügt
  imports: [ReactiveFormsModule],
  templateUrl: './list-archiv.component.html',
  styleUrl: './list-archiv.component.css',
})
export class ListArchivComponent implements OnInit {
  private dataservice = inject(BackendService); // Injezierung des Services
  toDos: Todo[] = [];
  filteredToDos: Todo[] = [];
  todo!: Todo;

  private router = inject(Router);
  private auth = inject(AuthService);

  search = new FormControl(''); // FormControl für die Suche, initial leer

  async ngOnInit(): Promise<void> {
    // async Methode, die Promise zurückgibt
    let userId = this.auth.user()._id; 
    this.toDos = await this.dataservice.getAllToDos(userId);
    this.filteredToDos = this.toDos
      .filter((t) => t.status == 'erledigt')
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
    let input = this.search.value?.toLocaleLowerCase() || ''; //? prüft, ob null, wenn nicht, dann to lower Case
  
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
      this.router.navigate(['/archiv']);
    }
  }

  filterPrio(prio: string): void {
    this.filteredToDos = this.toDos.filter(
      (t) =>
        t.prio.toLowerCase() === prio.toLowerCase() && t.status === 'erledigt'
    );
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
  }
}
