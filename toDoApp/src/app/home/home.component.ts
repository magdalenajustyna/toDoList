import { Component } from '@angular/core';
import { FilterComponent } from '../filter/filter.component';

@Component({
  selector: 'app-home',
  imports: [FilterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
