
import { HeaderComponent } from '../header/header.component';
import { ArchivbuttonComponent } from '../archivbutton/archivbutton.component';
import { ListComponent } from '../list/list.component';
import { LogoutbuttonComponent } from '../logoutbutton/logoutbutton.component';
import { NewtodobuttonComponent } from '../newtodobutton/newtodobutton.component';
import { Component, inject } from '@angular/core';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-home',
  imports: [
    HeaderComponent,
    ArchivbuttonComponent,
    ListComponent,
    LogoutbuttonComponent,
    NewtodobuttonComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent { 
  private auth = inject(AuthService);
  username = this.auth.user().name;

  constructor() { }
  
}



