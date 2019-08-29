import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { OpponentsService, Character } from 'src/app/opponents/opponents.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.css']
})
export class CharactersListComponent implements OnInit {

  characters: Character[] = [];
  characterControl = new FormControl();
  characterSelected: Character;

  @Input() defaultCharacter: Character;
  @Output() selectCharacter = new EventEmitter<Character>();

  constructor(private opponentsService: OpponentsService) { }

  ngOnInit() {
    this.opponentsService.getCharacters().subscribe((characters: Character[]) => {
      this.characters = characters;
      this.setDefaultCharacter();
    });
  }

  private setDefaultCharacter(): void {
    if(this.defaultCharacter) {
      this.characterSelected = this.defaultCharacter;
    } else {
      this.characterSelected = this.characters[0];
    }
    // Set Default Value
    this.characterControl.setValue(this.characterSelected.id);
    
    // Listen Value Changes
    this.characterControl.valueChanges.subscribe( (id: number) => {
      this.characterSelected = this.characters.find((char: Character) => {
        return char.id === id;
      });
      this.selectCharacter.emit(this.characterSelected);
    });
  }

}
