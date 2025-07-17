import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BackendService } from '../shared/backend.service';
import { Todo } from '../shared/todo';


@Component({
  selector: 'app-createnewtodo',
  standalone: true, //aus seinem Code
  imports: [RouterLink, HeaderComponent, ReactiveFormsModule],
  templateUrl: './createnewtodo.component.html',
  styleUrl: './createnewtodo.component.css',
})

export class CreatenewtodoComponent {
  private dataservice = inject(BackendService);
  private router = inject(Router);
  todo: Todo = { _id: '', status: '', todoName: '', prio: '', datum: '' };
  saved: boolean = false;

  form = new FormGroup({
    todoNameControl: new FormControl<string>('', [Validators.required]),
    prioControl: new FormControl<string>('', [Validators.required]),
    datumControl: new FormControl<string>('', [Validators.required]) 
  });

  create(): void {    // nur möglich, wenn alle Felder ausgefüllt sind // Meldung noch einbauen oder reicht rote Umrandung der Eingabefelder?
    if (this.form.valid) {      
      const values = this.form.value;

      let datumNeu = this.formatDateString_DDMMYYYY(values.datumControl!);
      this.todo.status = 'offen';
      this.todo.todoName = values.todoNameControl || '';    // was genau bedeutet || '' ? kann das raus, da wir mit validators arbeiten?
      this.todo.prio = values.prioControl || '';
      this.todo.datum = datumNeu || '';
        
      this.dataservice
          .create(this.todo)
          .then(() => this.router.navigate(['/home']));
    }
  }

  confirm(): void {   //diese Methode wird nicht genutzt in createNewToDo, also raus?
    this.router.navigate(['/home']);
  }

  
  formatDateString_DDMMYYYY(datum: string): string {
    const [year, month, day] = datum.split('-');
    return day + '.' + month + '.' + year;
  }

}
