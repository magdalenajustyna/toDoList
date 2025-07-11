import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
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
    todoNameControl: new FormControl<string>(''), // [Validators.required] muss das wieder rein?!?
    prioControl: new FormControl<string>(''), // es fehlen hier noch Prio und Datum
    datumControl: new FormControl<string>(''),
  });

  create(): void {
    const values = this.form.value;
    console.log('values : ', values);

    let datumNeu = this.formatDateString_DDMMYYYY(values.datumControl!);
    this.todo.status ='offen';
    this.todo.todoName = values.todoNameControl || '';
    this.todo.prio = values.prioControl || '';
    this.todo.datum = datumNeu || '';
    console.log('new todo : ', this.todo);

    if (
      this.todo.todoName != '' &&
      this.todo.prio != '' &&
      this.todo.datum != ''
    ) {
      this.dataservice
        .create(this.todo)
        .then(() => (this.saved = true))
  
    }
  }

  confirm(): void {
    this.router.navigate(['/home']);
  }

  cancel(): void {}

  formatDateString_DDMMYYYY(datum: string): string {
    const [year, month, day] = datum.split('-');
    return day + '.' + month + '.' + year;
  }

  setPrio(prio: string): void {
    this.form.patchValue({ prioControl: prio }); //setzt PrioWert aus Dropdown ins Formular (zwischenspeichern)
  }
}
