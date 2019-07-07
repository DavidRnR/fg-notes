import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OpponentsComponent } from './opponents/opponents.component';

import {
  MatToolbarModule,
  MatButtonModule, MatSidenavModule,
  MatIconModule, MatListModule, MatCardModule,
  MatInputModule, MatDialogModule, MatMenuModule, 
  MatAutocompleteModule, MatFormFieldModule, MatSelectModule, MatSnackBarModule
} from '@angular/material';
import { AppRoutingModule } from './app.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OpponentComponent } from './opponents/opponent/opponent.component';
import { HttpClientModule } from '@angular/common/http';
import { NoteComponent } from './opponents/note/note.component';
import { SearchBarComponent } from './search-bar/search-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    OpponentsComponent,
    OpponentComponent,
    NoteComponent,
    SearchBarComponent
  ],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatListModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  entryComponents: [OpponentComponent, NoteComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
