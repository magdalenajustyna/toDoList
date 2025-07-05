import { Component, inject, OnInit } from '@angular/core';
import { Todo } from '../shared/todo';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { BackendService } from '../shared/backend.service';

@Component({
  selector: 'app-list',
  imports: [ReactiveFormsModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit{  
  // in dem Moment in dem Tabl Component in Anwendung eingebunden wird, soll Service aufgerufen werden
  // in dem Moment sollen alle Daten geladen werden
  
  private dataservice = inject(BackendService)
  toDos: Todo[] = [];                     // Achtung Schreibweise!!
  filteredToDos: Todo[] = []; 

  search = new FormControl('');               // FormControl für die Suche, initial leer //ReactiveFormsModule muss auch in imports 
 
    async ngOnInit(): Promise<void>              // async Methode, die Promise zurückgibt
  {
   this.toDos = await this.dataservice.getAllToDos()
    this.filteredToDos = this.toDos
      .filter(t => t.status == "offen")
      .sort((a,b) => {
      let dateA = new Date(a.datum.split('.').reverse().join('-'));
      let dateB = new Date(b.datum.split('.').reverse().join('-'));
      return dateA.getTime() - dateB.getTime();     
   });       
      
      // initial nur offene ToDos anzeigen und nach Datum sortieren 
      // für Datumssortierung habe ich Chat Ki gewählt
    
   //this.filteredToDos = this.toDos;                     // initial alle Mitglieder in der Tabelle // wir wollen nur die offenen
   //console.log('toDos in table -> ', this.toDos);
  }

  filter() {
    let input = this.search.value?.toLocaleLowerCase() ||"";                //damit Zeile 35 funktioniert // ? prüft, ob null, wenn nicht, dann to lower Case
    console.log('input: ', input);
    this.filteredToDos = this.toDos.filter(t => (t.todoName.toLowerCase().includes(input) || t.prio.toLowerCase().includes(input)) && t.status == "offen");
     
  
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
 


