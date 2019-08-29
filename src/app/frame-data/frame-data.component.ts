import { Component, OnInit } from '@angular/core';
import { Character } from '../opponents/opponents.service';

const ELEMENT_DATA: any[] = [
  { move: 1, startup: 3, active: 3, recovery: 3, onhit: 6, onblock: 4, vtioh: 6, vtiob: 5, vtiioh: 4, vtiiob: 2 }
];

@Component({
  selector: 'app-frame-data',
  templateUrl: './frame-data.component.html',
  styleUrls: ['./frame-data.component.css']
})
export class FrameDataComponent implements OnInit {
  displayedColumns: string[] = ['move', 'startup', 'active', 'recovery', 'onhit', 'onblock', 'vtioh', 'vtiob', 'vtiioh', 'vtiiob'];
  dataSource = ELEMENT_DATA;

  characterSelected: Character;
  constructor() { }

  ngOnInit() {

  }

  onSelectCharacter($event) {
    // this.characterSelected = this.characters.find((char: Character) => {
    //   return char.id === $event.value;
    // });
  }


}
