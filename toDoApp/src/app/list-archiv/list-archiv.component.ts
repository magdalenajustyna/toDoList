import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { BackendService } from '../shared/backend.service';
import { Todo } from '../shared/todo';

@Component({
  selector: 'app-list-archiv',
  imports: [ReactiveFormsModule, ListArchivComponent],
  templateUrl: './list-archiv.component.html',
  styleUrl: './list-archiv.component.css'
})
export class ListArchivComponent implements OnInit{  
  // in dem Moment in dem Tabl Component in Anwendung eingebunden wird, soll Service aufgerufen werden
  // in dem Moment sollen alle Daten geladen werden

  private dataservice = inject(BackendService);       // Injezierung des Services
  toDos: Todo[] = [];                     // Achtung Schreibweise!!
  filteredToDos: Todo[] = []; 

  search = new FormControl('');               // FormControl für die Suche, initial leer //ReactiveFormsModule muss auch in imports 
 
    async ngOnInit(): Promise<void>              // async Methode, die Promise zurückgibt
  {
   this.toDos = await this.dataservice.getAllToDos()
    this.filteredToDos = this.toDos.filter(t => t.status == "erledigt")
    .sort((a,b) => {
      let dateA = new Date(a.datum.split('.').reverse().join('-'));
      let dateB = new Date(b.datum.split('.').reverse().join('-'));
      return dateA.getTime() - dateB.getTime();     
   }); 
   
   // initial nur erledigte ToDos anzeigen, KI für sort Methode genutzt
 
   //this.filteredToDos = this.toDos;                     // initial alle Mitglieder in der Tabelle // wir wollen nur die offenen
   //console.log('toDos in table -> ', this.toDos);
  }

  filter() {
    let input = this.search.value?.toLocaleLowerCase() ||"";                //damit Zeile 35 funktioniert // ? prüft, ob null, wenn nicht, dann to lower Case
    console.log('input: ', input);
    this.filteredToDos = this.toDos.filter(t => (t.todoName.toLowerCase().includes(input) || t.prio.toLowerCase().includes(input)) && t.status == "erledigt");
     
  
  }
  
    confirmAction() {
    const confirmed = window.confirm('Möchtest du das ToDo wirklich löschen?');
    if (confirmed) {
      console.log('Aktion bestätigt!');
    } else {
      console.log('Aktion abgebrochen!');
    }
  }
  

  
}
