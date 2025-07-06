import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BackendService } from '../shared/backend.service';
import { Todo } from '../shared/todo';

@Component({
  selector: 'app-update',
  imports: [RouterLink, HeaderComponent, ReactiveFormsModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent {

  private dataservice = inject(BackendService)
  private router = inject(Router)
  todo: Todo = {_id: '', status: '', todoName: '', prio: '', datum: ''}
  saved: boolean = false

  form = new FormGroup({
    todoNameControl : new FormControl<string>('', ),   // [Validators.required] muss das wieder rein?!?
    // es fehlen hier noch Prio und Datum
  });

}

