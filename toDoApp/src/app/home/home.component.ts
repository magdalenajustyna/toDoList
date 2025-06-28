import { Component } from '@angular/core';
import { FilterComponent } from '../filter/filter.component';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { ArchivbuttonComponent } from '../archivbutton/archivbutton.component';
import { ListComponent } from '../list/list.component';

@Component({
  selector: 'app-home',
  imports: [FilterComponent, RouterLink, HeaderComponent, ArchivbuttonComponent, ListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
