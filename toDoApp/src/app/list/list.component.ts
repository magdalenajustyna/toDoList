import { Component, inject, OnInit } from '@angular/core';
import { Todo } from '../shared/todo';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { BackendService } from '../shared/backend.service';
import { UpdateComponent } from '../update/update.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true, //standalone aus seinem Code eingefügt
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit{  
  // in dem Moment in dem Tabl Component in Anwendung eingebunden wird, soll Service aufgerufen werden
  // in dem Moment sollen alle Daten geladen werden
  
  private dataservice = inject(BackendService)
  toDos: Todo[] = [];                     // Achtung Schreibweise!!
  filteredToDos: Todo[] = []; 
  todo!: Todo

  deleteStatus: boolean = false;

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
   console.log('todos in list: ', this.toDos) ;      
      
      // initial nur offene ToDos anzeigen und nach Datum sortieren 
      // für Datumssortierung habe ich Chat Ki gewählt
    
   //this.filteredToDos = this.toDos;                     // initial alle Mitglieder in der Tabelle // wir wollen nur die offenen
   //console.log('toDos in table -> ', this.toDos);
  }

  delete(id: string): void {
    console.log(`member mit id=${id} löschen`)
  }

  //diese Methode darf bei Sicherheitsabfrage nicht gleich löschen (getOne muss aufgerufen werden anstatt delete, siehe unten)
 /*async delete(id: string) {
    console.log('delete in home-list: ', id)
    this.dataservice.deleteOne(id)
    this.toDos = await this.dataservice.getAllToDos()     //warum aktualisiert der nicht selbstständig?
 } */

      

 
  /*delete(id: string): void {
    this.dataservice.getOne(String(id))
    .then(
      response => {
        this.todo = response
        this.deleteStatus=true;
      }
    )
  }

  confirm() {
    this.dataservice.deleteOne(String(this.todo._id))
    .then( () => {
      this.dataservice.getAllToDos()
      .then( response => {
        this.toDos = response 
        this.deleteStatus=false;
      })
    })
  }

  cancel() {
    this.deleteStatus=false;
  } */          
  

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
 


