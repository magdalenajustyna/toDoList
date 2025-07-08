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
  private router = inject(Router) 

  todo!: Todo;
  id: string | null = ''
  form = new FormGroup({
    todoNameControl : new FormControl<string>(''),
    prioControlOld: new FormControl<string>(''),
    prioControlButton: new FormControl<string>(''),
    datumControlOld: new FormControl<string>(''),
    datumControlButton: new FormControl<string>('')
});

  ngOnInit(): void //holt todo aus Datenbank und befüllt Formular
  {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('id = ', this.id)
    this.dataservice.getOne(this.id!)
    .then(response => { 
      this.todo = response 
      this.form.patchValue({
        todoNameControl: this.todo?.todoName,
        prioControlOld: this.todo?.prio,
        datumControlOld: this.todo?.datum
      })
      return this.todo
    })
    .then( todo => {
      if(!todo.todoName) {
        this.router.navigate(['/home']);  // richtig??
      } else {
        console.log('todo in DetailComponent : ', todo )
      }
    })   
  }

  setPrio(prio: string) : void {    //mit Hilfe von ChatKI

    this.form.patchValue({ prioControlButton: prio });    //setzt PrioWert aus Dropdown ins Formular (zwischenspeichern)
    
  }

  formatDateToString(date: Date): string {
    const day = date.getDate();
    const month = date.getMonth() + 1; // Monate sind nullbasiert -> Januar = 0
    const year = date.getFullYear();

    // Tag und Monat in 2-stelliges Format umwandeln
    const dayString = day < 10 ? '0' + day : day.toString();
    const monthString = month < 10 ? '0' + month : month.toString();
    const datumNeu = dayString + '.' + monthString + '.' + year;
    return datumNeu;
    /* return `${dayString}.${monthString}.${year}`;*/
    
}

  setDate(datum: Date) : void {    
    //Datum aus Datepicker auslesen (YYYY-MM-DD) --> dieser muss in String DD-MM-YYYY umgewandelt werden
    const datumNeu = this.formatDateToString(datum);   
    this.form.patchValue({ datumControlButton: datumNeu });    //setzt Datum aus Dropdown ins Formular (zwischenspeichern)
    
    
  }

  update(): void {
    const values = this.form.value;
    this.todo.todoName = values.todoNameControl!;   
    this.todo.prio =  values.prioControlButton!;    
    this.todo.datum = values.datumControlButton!;

    this.dataservice.update(this.id!, this.todo)
    .then( () => this.router.navigate(['/home']))     //geht nur zu Home wenn update erfolgreich
  }

  cancel(): void {
    this.router.navigate(['/home']);
  }






}


