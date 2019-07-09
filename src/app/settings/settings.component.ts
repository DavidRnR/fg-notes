import { Component } from '@angular/core';
import { SnackbarService } from '../snackbar/snackbar-message.component';
import { Observable, Subscription } from 'rxjs';
import { IndexedDBService } from '../idb.service';
import { TranslateService } from '@ngx-translate/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {

  languages = [{ id: 'en', name: 'English' }, { id: 'es', name: 'Spanish' },
  { id: 'jp', name: 'Japanese' }, { id: 'ko', name: 'Korean' }];
  langControl = new FormControl();

  constructor(private indexedDB: IndexedDBService, private snackbarService: SnackbarService,
    private translateService: TranslateService) {
    this.initLang();
  }

  onDeleteDatabase() {
    const confirmSnackBar$: Subscription = this.openConfirmSnackBar(this.translateService.instant('restoreAppQuestion'), 'confirm', 'snackbar-main-confirm')
      .subscribe((confirm: boolean) => {
        if (confirm) {
          this.indexedDB.deleteDatabase().subscribe(() => {
            // Reload page
            location.reload();
          });
          localStorage.clear();
        }
      }, (error) => {
        console.error(error);
      }, () => {
        confirmSnackBar$.unsubscribe();
      });
  }

  onChangeLanguage($event) {
    this.translateService.setDefaultLang($event.value);
    localStorage.setItem('lang', $event.value);
  }

  private initLang() {
    const defaultlang = this.languages.find((l) => {
      return l.id === this.translateService.getDefaultLang();
    });
    this.langControl.setValue(defaultlang.id);
  }

  private openConfirmSnackBar(message, type, className): Observable<boolean> {
    this.snackbarService.status.next({ message: message, type: type, class: className });
    return this.snackbarService.onConfirmSnackbar();
  }

  private openSnackBar(message, type) {
    this.snackbarService.status.next({ message: message, type: type, class: `snackbar-main-${type}`, duration: 4000 });
  }
}
