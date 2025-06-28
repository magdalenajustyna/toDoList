import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit{
  items: string[] = [];

  constructor() {}

  ngOnInit(): void {}

  addItem(): void {
    this.items.push(''); // fügt einen neuen leeren Eintrag hinzu
  }
}
