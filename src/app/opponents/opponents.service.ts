import { IndexedDBService } from '../services/idb.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

export interface Character {
    id: number;
    name: string;
    image: string;
}

export interface Opponent {
    id?: number;
    cfn: string;
    name: string;
    character: Character;
    notes: string[]
}

@Injectable({
    providedIn: 'root'
})
export class OpponentsService {

    constructor(private http: HttpClient, private indexedDBService: IndexedDBService) { }

    addOpponent(opponent: Opponent): Observable<Opponent> {
        return this.indexedDBService.addItem(opponent)
    }

    updateOpponent(opponent: Opponent): Observable<Opponent> {
        return this.indexedDBService.putItem(opponent);
    }

    getCharacters(): Observable<Character[]> {
        return this.http.get('/assets/characters/data/characters.json').pipe(
            map((characters: Character[]) => characters)
        );
    }

    getOpponents(): Observable<Opponent[]> {
        return this.indexedDBService.getItems();
    }

    deleteOpponent(opponent: Opponent): Observable<boolean> {
        return this.indexedDBService.deleteItem(opponent.id);
    }
}