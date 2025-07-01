import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { LogoutbuttonComponent } from '../logoutbutton/logoutbutton.component';
import { ZurueckbuttonComponent } from '../zurueckbutton/zurueckbutton.component';
import { ListArchivComponent } from '../list-archiv/list-archiv.component';

@Component({
  selector: 'app-archiv',
  imports: [RouterLink, ListArchivComponent, HeaderComponent, LogoutbuttonComponent, ZurueckbuttonComponent],
  templateUrl: './archiv.component.html',
  styleUrl: './archiv.component.css'
})
export class ArchivComponent {

}
