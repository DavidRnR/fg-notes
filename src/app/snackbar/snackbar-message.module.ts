import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatSnackBarModule, MatButtonModule } from '@angular/material';
import { SnackbarMessageComponent, SnackbarService } from './snackbar-message.component';

@NgModule({
    declarations: [SnackbarMessageComponent],
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatSnackBarModule],
    exports: [SnackbarMessageComponent],
    entryComponents: [SnackbarMessageComponent],
    providers: [SnackbarService],
})
export class SnackBarMessageModule { }
