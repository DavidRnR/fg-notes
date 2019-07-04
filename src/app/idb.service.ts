import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class IndexedDBService {
    dbPromise: IDBOpenDBRequest;
    db;
    objectStore;

    constructor() { }

    initDB(): Observable<any> {
        const subject = new Subject();
        this.dbPromise = window.indexedDB.open('fg-notes', 1);

        this.dbPromise.onerror = (error) => {
            console.error(error);
            subject.error(error);
        };

        this.dbPromise.onsuccess = (event: any) => {
            this.db = this.dbPromise.result;
            subject.next(event);
        };

        this.dbPromise.onupgradeneeded = (event: any) => {
            this.db = event.target.result;

            this.db.onerror = function (event) {

            };

            // Create an objectStore for this database
            this.objectStore = this.db.createObjectStore('opponent', { keyPath: 'cfn', autoIncrement: true });

        };
        return subject.asObservable();
    }

    addItem(item, type): Observable<any> {

        const subject = new Subject();
        // open a read/write db transaction, ready for adding the data
        const transaction = this.db.transaction([type], 'readwrite');

        // report on the success of the transaction completing, when everything is done
        transaction.oncomplete = (event) => {
            console.log('completed');

        };

        transaction.onerror = (error) => {
            console.error(error);
            subject.next(error);
        };

        const objectStore = transaction.objectStore(type);
        const objectStoreRequest = objectStore.add(item);
        objectStoreRequest.onsuccess = (event) => {
            console.log('completed obj');
            subject.next(event);
        };
        return subject.asObservable();
    }

    getItems(): Observable<any> {
        const subject = new Subject();

        const transaction = this.db.transaction(['opponent'], 'readonly');

        const objectStore = transaction.objectStore('opponent');

        objectStore.getAll().onsuccess = (event) => {
            subject.next(event.target.result);
            subject.complete();
        };

        objectStore.getAll().onerror = (event) => {
            console.error(event);
            subject.error(event)
        };
        return subject.asObservable();
    }

}