import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { SnackbarService } from '../snackbar/snackbar-message.component';
import { Observable, Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class PromptUpdateService {

  constructor(private updates: SwUpdate, private snackbarService: SnackbarService,
    private translateService: TranslateService) { }

  checkNewVersionSW() {
    this.updates.available.subscribe(event => {
      const message = `New Version ${this.translateService.instant('isAvailable')}`;
      const confirmSnackBar$: Subscription = this.openConfirmSnackBar(message, 'confirm', 'snackbar-main-confirm')
        .subscribe((confirm: boolean) => {
          if (confirm) {
            this.updates.activateUpdate().then(() => document.location.reload());
          }
        }, (error) => {
          console.error(error);
        }, () => {
          confirmSnackBar$.unsubscribe();
        });
    });
  }

  private openConfirmSnackBar(message, type, className): Observable<boolean> {
    this.snackbarService.status.next({ message: message, type: type, class: className });
    return this.snackbarService.onConfirmSnackbar();
  }

}