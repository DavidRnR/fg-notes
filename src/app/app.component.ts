import { Component } from '@angular/core';
import { IndexedDBService } from './idb.service';
import { MatDialog } from '@angular/material';
import { SettingsComponent } from './settings/settings.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  dbLoaded = false;
  constructor(private indexedDB: IndexedDBService, public dialog: MatDialog) {
    this.indexedDB.initDB().subscribe( result => {
      this.dbLoaded = true;
    });
  }

  showSettings() {
    const dialogRef = this.dialog.open(SettingsComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
 
      }
    });
  }
}
