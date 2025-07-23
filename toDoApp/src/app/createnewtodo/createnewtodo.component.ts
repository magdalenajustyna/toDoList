import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BackendService } from '../shared/backend.service';
import { Todo } from '../shared/todo';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-createnewtodo',
  standalone: true, // Code aus Skript
  imports: [RouterLink, HeaderComponent, ReactiveFormsModule],
  templateUrl: './createnewtodo.component.html',
  styleUrl: './createnewtodo.component.css',
})

export class CreatenewtodoComponent {
  private dataservice = inject(BackendService);
  private router = inject(Router);
  private authService = inject(AuthService);
  todo: Todo = { _id: '', status: '', todoName: '', prio: '', datum: '', user_id: '' };
  saved: boolean = false;

  form = new FormGroup({
    todoNameControl: new FormControl<string>('', [Validators.required]),
    prioControl: new FormControl<string>('', [Validators.required]),
    datumControl: new FormControl<string>('', [Validators.required])
  });

  create(): void {    // nur möglich, wenn alle Felder ausgefüllt sind
    if (this.form.valid) {
      const values = this.form.value;

      let datumNeu = this.formatDateString_DDMMYYYY(values.datumControl!);
      this.todo.status = 'offen';
      this.todo.todoName = values.todoNameControl || '';    
      this.todo.prio = values.prioControl || '';
      this.todo.datum = datumNeu || '';
      this.todo.user_id = this.authService.user()._id; // user_id des aktuellen Users, leider wird die ID nicht ausgelesen, warum?

      this.dataservice
        .create(this.todo)
        .then(() => this.router.navigate(['/home']));
    }
    else {
      this.form.markAllAsTouched();  // alle Felder als "berührt" markieren, um Validierung auszulösen
    }
  }

  formatDateString_DDMMYYYY(datum: string): string {
    const [year, month, day] = datum.split('-');
    return day + '.' + month + '.' + year;
  }

}
