import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BackendService } from '../shared/backend.service';
import { Todo } from '../shared/todo';

@Component({
  selector: 'app-update',
  standalone: true, //aus seinem Code übernommen
  imports: [HeaderComponent, ReactiveFormsModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css',
})
export class UpdateComponent implements OnInit {
  private dataservice = inject(BackendService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  todo!: Todo;
  id: string | null = '';
  form = new FormGroup({
    //Steuerelemente
    todoNameControl: new FormControl<string>(''),
    prioControlButton: new FormControl<string>(''),
    datumControl: new FormControl<string>(''),
  });

  ngOnInit(): void {
    //holt todo aus Datenbank und befüllt Formular
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('id = ', this.id);
    this.dataservice
      .getOne(this.id!)
      .then((response) => {
        this.todo = response;
        this.form.patchValue({
          todoNameControl: this.todo?.todoName,
          prioControlButton: this.todo?.prio,
          // um den Datepicker mit altem Datum zu belegen, muss Datum aus DB ins richtige Format gebracht werden
          // String 10.07.2025 muss zu 2025-07-10 
          datumControl: this.todo?.datum.split('.').reverse().join('-')    //Vorschlag von VS Code
        });
        return this.todo;
      })
      .then((todo) => {
        if (!todo.todoName) {
          this.router.navigate(['/home']); 
        } else {
          console.log('todo in DetailComponent : ', todo);
        }
      });
  }

  //Methode um Datums String umzusortieren   //Hilfe von Chat KI
  formatDateString_DDMMYYYY(datum: string): string {
    const [year, month, day] = datum.split('-');
    return day + '.' + month + '.' + year;
  }

  update(): void {     //soll nur funktionieren, wenn to doName ausgefüllt ist  (der Rest wird ggf mit alten Werten befüllt)
    if (this.form.controls.todoNameControl.valid) { 

    const values = this.form.value;
    let datumNeu;   //Var für Datum
    this.todo.todoName = values.todoNameControl!; //neuer Name aus Formular
    this.todo.prio = values.prioControlButton!; //neue Prio aus Select Dropdown

    if (values.datumControl!) {   
      //nur wenn Datepicker ausgefüllt, neues Datum auslesen und für ToDo verwenden
      datumNeu = this.formatDateString_DDMMYYYY(values.datumControl!);
      this.todo.datum = datumNeu;
    } //ansonsten alten Wert behalten
    else {
      this.todo.datum = values.datumControl!;
    }

    this.dataservice
      .update(this.id!, this.todo)
      .then(() => this.router.navigate(['/home'])); //geht nur zu Home wenn update erfolgreich
  }
}

  cancel(): void {
    this.router.navigate(['/home']);
  }
}
