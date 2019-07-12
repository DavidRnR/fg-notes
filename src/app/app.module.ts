import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MatToolbarModule,
  MatButtonModule, MatSidenavModule,
  MatIconModule, MatListModule, MatCardModule,
  MatInputModule, MatDialogModule, MatMenuModule,
  MatAutocompleteModule, MatFormFieldModule, MatSelectModule, MatProgressSpinnerModule
} from '@angular/material';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { SnackBarMessageModule } from './snackbar/snackbar-message.module';

// Components
import { AppComponent } from './app.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { OpponentsComponent } from './opponents/opponents.component';
import { OpponentComponent } from './opponents/opponent/opponent.component';
import { NoteComponent } from './opponents/note/note.component';
import { SettingsComponent } from './settings/settings.component';

// Pipes
import { OrderAzPipe } from './pipes/order-az.pipe';
import { TruncatePipe } from './pipes/truncate.pipe';

//Translation
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

@NgModule({
  declarations: [
    AppComponent,
    OpponentsComponent,
    OpponentComponent,
    NoteComponent,
    SearchBarComponent,
    SettingsComponent,
    OrderAzPipe,
    TruncatePipe
  ],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
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
    MatProgressSpinnerModule,
    SnackBarMessageModule
  ],
  entryComponents: [OpponentComponent, NoteComponent, SettingsComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/');
}