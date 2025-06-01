import { Component } from '@angular/core';

@Component({
  selector: 'app-info-box',
  imports: [],
  templateUrl: './info-box.component.html',
  styleUrl: './info-box.component.css'
})
export class InfoBoxComponent {

  //Variable Daten 

  text = 'Test-Text für Button';

  isHidden = true;

  handleClick() {
    this.isHidden = !this.isHidden;
  }

}
