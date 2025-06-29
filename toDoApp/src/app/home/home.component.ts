import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { ArchivbuttonComponent } from '../archivbutton/archivbutton.component';
import { ListComponent } from '../list/list.component';
import { LogoutbuttonComponent } from '../logoutbutton/logoutbutton.component';
import { NewtodobuttonComponent } from '../newtodobutton/newtodobutton.component';
import { TodosService } from '../shared/todos.service';
import { Todo } from '../shared/todo';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [RouterLink, HeaderComponent, ArchivbuttonComponent, ListComponent,
    LogoutbuttonComponent, NewtodobuttonComponent, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  //abstrakte Methode von Init muss implementiert werden
  
  // in dem Moment in dem Tabl Component in Anwendung eingebunden wird, soll Service aufgerufen werden
  // in dem Moment sollen alle Daten geladen werden

  dataservice = inject(TodosService);       // Injezierung des Services
  toDos: Todo[] = [];                     // achtung Schreibweise!!
  filteredToDos: Todo[] = []; 

  search = new FormControl('');               // FormControl für die Suche, initial leer //ReactiveFormsModule muss auch in imports 
 
  async ngOnInit(): Promise<void>              // async Methode, die Promise zurückgibt
  {
   this.toDos = await this.dataservice.getAllToDos()
   this.filteredToDos = this.toDos.filter(t => t.status == "offen");
   //console.log('toDos in table -> ', this.toDos);
  }

  filter() {
    let input = this.search.value?.toLocaleLowerCase() ||""; //damit Zeile 35 funktioniert // ? prüft, ob null, wenn nicht, dann to lower Case
    console.log('input: ', input);
    this.filteredToDos = this.toDos.filter(t => t.todo.toLowerCase().includes(input)); //nur nach Namen filtern??
  
  }

  /* können die Methoden bei Home wieder raus, weil sie bei filter & Liste reichen? */


}
