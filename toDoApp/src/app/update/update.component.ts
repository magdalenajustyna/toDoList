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
    datumControlOld: new FormControl<string>(''),
    datumControlButton: new FormControl<string>(''),
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
          datumControlOld: this.todo?.datum,
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

  // funktioniert auch ohne setPrio???
  //mit Hilfe von ChatKI
  /*setPrio(prio: string): void {
    this.form.patchValue({ prioControlButton: prio }); //setzt PrioWert aus Dropdown ins Formular (zwischenspeichern)
  }
    */

  //Methode um Datums String umzusortieren   //Hilfe von Chat KI
  formatDateString_DDMMYYYY(datum: string): string {
    const [year, month, day] = datum.split('-');
    return day + '.' + month + '.' + year;
  }

  update(): void {      //FUNKTIONIERT!!
    const values = this.form.value;
    let datumNeu;
    this.todo.todoName = values.todoNameControl!;
    this.todo.prio = values.prioControlButton!;

    if (values.datumControlButton!) {     //nur wenn Datepicker ausgefüllt, neues Datum auslesen und für neues ToDo verwenden
      datumNeu = this.formatDateString_DDMMYYYY(values.datumControlButton!);
      this.todo.datum = datumNeu;
    } else    //ansonsten alten Wert behalten
       {
      this.todo.datum = values.datumControlOld!;
    }
         

    this.dataservice
      .update(this.id!, this.todo)
      .then(() => this.router.navigate(['/home'])); //geht nur zu Home wenn update erfolgreich
      
      console.log('Ausgabe des Datum als String: ', datumNeu);
  }

  cancel(): void {
    this.router.navigate(['/home']);
  }
}
