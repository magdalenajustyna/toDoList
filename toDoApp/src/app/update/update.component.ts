import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BackendService } from '../shared/backend.service';
import { Todo } from '../shared/todo';

@Component({
  selector: 'app-update',
  standalone: true, //aus seinem Code übernommen
  imports: [RouterLink, HeaderComponent, ReactiveFormsModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent implements OnInit {
 
  private dataservice = inject(BackendService)
  private route = inject(ActivatedRoute)
  todo!: Todo;
  id: string | null = ''
  form = new FormGroup({
    todoNameControl : new FormControl<string>(''),
    prioControl: new FormControl<string>(''),
    datumControl: new FormControl<string>('')
});

  ngOnInit(): void //holt todo 
  {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('id = ', this.id)
    this.dataservice.getOne(this.id!)
    .then(response => { 
      this.todo = response 
      this.form.patchValue({
        todoNameControl: this.todo?.todoName,
        prioControl: this.todo?.prio,
        datumControl: this.todo?.datum
      })
      return this.todo
    })
    .then( todo => console.log('todo in DetailComponent : ', todo )) 
  }



  

}


