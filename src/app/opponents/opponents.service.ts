import { IndexedDBService } from './../idb.service';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

export interface Character {
    id: number;
    name: string;
    image: string;
}

export interface Note {
    id?: number;
    note: string;
}

export interface Opponent {
    id?: number;
    cfn: string;
    name: string;
    character: Character;
    notes: Note[]
}

@Injectable({
    providedIn: 'root'
})
export class OpponentsService {
    dbPromise;
    constructor(private http: HttpClient, private indexedDBService: IndexedDBService) { }

    initDB() {
        this.dbPromise = window.indexedDB.open('fg-notes', 1);
    }

    addOpponent(opponent: Opponent): Observable<Opponent> {
        const subject = new Subject<Opponent>();
        this.indexedDBService.addItem(opponent, 'opponent').subscribe((result) => {
            console.log(result);
        });
        return subject.asObservable();
    }

    addNote(note: Note): Observable<Note> {
        const subject = new Subject<Note>();
        this.indexedDBService.addItem(note, 'note').subscribe((result) => {
            console.log(result);
        });
        return subject.asObservable();
    }

    getCharacters(): Observable<Character[]> {

        return this.http.get('/assets/characters/data/characters.json').pipe(
            map((characters: Character[]) => characters)
        );

    }

    getOpponents(): Observable<Opponent[]> {
        const subject = new Subject<Opponent[]>();
        this.indexedDBService.getItems().subscribe((result) => {
            console.log(result);
            subject.next(result);
        }, (error) => {
            subject.error(error);
        }, () => {
            subject.complete();
        });
        return subject.asObservable();
    }

}