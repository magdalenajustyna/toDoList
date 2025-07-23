import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../shared/auth.service';
//import { User } from '../shared/user';

@Component({
  selector: 'app-logoutbutton',
  imports: [RouterLink],
  templateUrl: './logoutbutton.component.html',
  styleUrl: './logoutbutton.component.css',
})
export class LogoutbuttonComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  logout(): void {
    this.auth.unsetUser();
    this.router.navigate(['/login']);
  }
}
