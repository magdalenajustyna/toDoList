import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegisterFormComponent } from './register-form/register-form.component';
import { DeleteComponent } from './delete/delete.component';
import { ArchivbuttonComponent } from './archivbutton/archivbutton.component';
import { FilterComponent } from './filter/filter.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RegisterFormComponent, DeleteComponent, ArchivbuttonComponent, FilterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'toDoApp';
}
