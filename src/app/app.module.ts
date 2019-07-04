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
  MatInputModule, MatDialogModule, MatTableModule,
  MatMenuModule, MatCheckboxModule, MatProgressSpinnerModule, MatAutocompleteModule, MatExpansionModule, MatTooltipModule, MatFormFieldModule, MatSelectModule
} from '@angular/material';
import { AppRoutingModule } from './app.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewOpponentComponent } from './opponents/new-opponent/new-opponent.component';
import { HttpClientModule } from '@angular/common/http';
import { NoteComponent } from './opponents/note/note.component';

@NgModule({
  declarations: [
    AppComponent,
    OpponentsComponent,
    NewOpponentComponent,
    NoteComponent
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
    MatDialogModule
  ],
  entryComponents: [NewOpponentComponent, NoteComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
