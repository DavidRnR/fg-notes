import { Component, OnInit } from '@angular/core';
import { IndexedDBService } from './services/idb.service';
import { MatDialog } from '@angular/material';
import { SettingsComponent } from './settings/settings.component';
import { TranslateService } from '@ngx-translate/core';
import { environment } from './../environments/environment';
import { PromptUpdateService } from './services/prompt-update.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  dbLoaded = false;
  version = '';

  constructor(private indexedDB: IndexedDBService, public dialog: MatDialog, 
              private translateService: TranslateService, private promptUpdateService: PromptUpdateService) {
    this.indexedDB.initDB().subscribe( result => {
      this.dbLoaded = true;
    });
    this.initLang();
    this.version = environment.version;
  }

  ngOnInit(): void {
    // Check new Service Worker Version
    this.promptUpdateService.checkNewVersionSW();
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
