import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-createnewtodo',
  imports: [RouterLink, HeaderComponent],
  templateUrl: './createnewtodo.component.html',
  styleUrl: './createnewtodo.component.css'
})
export class CreatenewtodoComponent {

}
