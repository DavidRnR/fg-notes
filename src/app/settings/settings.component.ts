import { Component, OnInit } from '@angular/core';
import { SnackbarService } from '../snackbar/snackbar-message.component';
import { Observable, Subscription } from 'rxjs';
import { IndexedDBService } from '../idb.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  languages = [{id: 0, name: 'English'}, {id: 1, name: 'Spanish'}, {id: 3, name: 'Japanese'}];
  constructor(private indexedDB: IndexedDBService, private snackbarService: SnackbarService) { }

  ngOnInit() {
  }

  onDeleteDatabase() {
    const confirmSnackBar$: Subscription = this.openConfirmSnackBar(`Are you sure you want to delete the Database?`, 'confirm', 'snackbar-main-confirm')
    .subscribe((confirm: boolean) => {
      if (confirm) {
        this.indexedDB.deleteDatabase().subscribe( () => {
          // Reload page
          location.reload();
        });
      }
    }, (error) => {
      console.error(error);
    }, () => {
      confirmSnackBar$.unsubscribe();
    });
  }
  
  private openConfirmSnackBar(message, type, className): Observable<boolean> {
    this.snackbarService.status.next({ message: message, type: type, class: className });
    return this.snackbarService.onConfirmSnackbar();
  }

  private openSnackBar(message, type) {
    this.snackbarService.status.next({ message: message, type: type, class: `snackbar-main-${type}`, duration: 4000 });
  }
}
