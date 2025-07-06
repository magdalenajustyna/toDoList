import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { ArchivbuttonComponent } from '../archivbutton/archivbutton.component';
import { ListComponent } from '../list/list.component';
import { LogoutbuttonComponent } from '../logoutbutton/logoutbutton.component';
import { NewtodobuttonComponent } from '../newtodobutton/newtodobutton.component';
import { Component } from '@angular/core';
import { UpdateComponent } from '../update/update.component';


@Component({
  selector: 'app-home',
  imports: [RouterLink, HeaderComponent, ArchivbuttonComponent, ListComponent,
    LogoutbuttonComponent, NewtodobuttonComponent, UpdateComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {}



