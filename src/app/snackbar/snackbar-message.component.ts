import { Component, Injectable, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { MatSnackBar, MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';


@Injectable()
export class SnackbarService {
    status: BehaviorSubject<any> = new BehaviorSubject(false);
    status$: Observable<any> = this.status.asObservable();
    confirm: BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor(public snackBar: MatSnackBar) {
        this.status$.subscribe((data: any) => {
            if (data && data.message) {
                this.openSnackBar(data);
            }
        });
    }

    openSnackBar(data: any = null) {
        this.snackBar.openFromComponent(SnackbarMessageComponent, {
            duration: (data.duration) ? data.duration : null,
            data: { data: data }, panelClass: data.class
        });
    }

    onConfirmSnackbar(): Observable<boolean> {
        return this.confirm.asObservable();
    }

    confirmSnackbar() {
        this.confirm.next(true);
        this.confirm.complete();
        this.resetConfirmSnackbar();
    }

    resetConfirmSnackbar() {
        this.confirm = new BehaviorSubject(false);
    }
}

@Component({
    selector: 'app-snackbar-message',
    templateUrl: './snackbar-message.component.html',
    styleUrls: ['./snackbar-message.component.css']
})
export class SnackbarMessageComponent {
    message = '';
    type = { success: false, error: false, confirm: false };

    constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any, private snackRef: MatSnackBarRef<SnackbarMessageComponent>,
        private snackService: SnackbarService) {

        this.message = (data && data.data.message) ? data.data.message : '';
        if (data && data.data.type) { this.type[data.data.type] = true; }
    }

    onDismiss() {
        this.snackService.resetConfirmSnackbar();
        this.snackRef.dismiss();
    }

    onConfirm() {
        this.snackService.confirmSnackbar();
        this.onDismiss();
    }
}
