import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-createnewtodo',
  imports: [RouterLink, HeaderComponent, ReactiveFormsModule],
  templateUrl: './createnewtodo.component.html',
  styleUrl: './createnewtodo.component.css'
})
export class CreatenewtodoComponent {

}
