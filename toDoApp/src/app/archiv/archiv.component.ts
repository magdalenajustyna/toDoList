import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ListComponent } from '../list/list.component';
import { HeaderComponent } from '../header/header.component';
import { LogoutbuttonComponent } from '../logoutbutton/logoutbutton.component';
import { ZurueckbuttonComponent } from '../zurueckbutton/zurueckbutton.component';

@Component({
  selector: 'app-archiv',
  imports: [RouterLink, ListComponent, HeaderComponent, LogoutbuttonComponent, ZurueckbuttonComponent],
  templateUrl: './archiv.component.html',
  styleUrl: './archiv.component.css'
})
export class ArchivComponent {

}
