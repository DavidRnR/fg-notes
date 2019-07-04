import { Component } from '@angular/core';
import { IndexedDBService } from './idb.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  dbLoaded = false;
  constructor(private indexedDB: IndexedDBService) {
    this.indexedDB.initDB().subscribe( result => {
      this.dbLoaded = true;
    });
  }
}
