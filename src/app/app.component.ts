import { Component } from '@angular/core';
import { IndexedDBService } from './services/idb.service';
import { MatDialog } from '@angular/material';
import { SettingsComponent } from './settings/settings.component';
import { TranslateService } from '@ngx-translate/core';
import { environment } from './../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  dbLoaded = false;
  version = '';

  constructor(private indexedDB: IndexedDBService, public dialog: MatDialog, 
              private translateService: TranslateService) {
    this.indexedDB.initDB().subscribe( result => {
      this.dbLoaded = true;
    });
    this.initLang();
    this.version = environment.version;
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

  private initLang() {
    let lang = localStorage.getItem('lang');
    if (!lang) {
      lang = 'en';
      localStorage.setItem('lang', lang);
    } 
    this.translateService.setDefaultLang(lang);
  }
}
