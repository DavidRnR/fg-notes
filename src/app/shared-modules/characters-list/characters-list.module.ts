import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule, MatFormFieldModule } from '@angular/material';

// Modules
import { TranslateModule } from '@ngx-translate/core';
import { SharedPipesModule } from '../shared-pipes/shared-pipes.module';

// Services
import { OpponentsService } from './../../opponents/opponents.service';

// Components
import { CharactersListComponent } from './characters-list.component';

@NgModule({
  declarations: [
    CharactersListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    MatFormFieldModule,
    MatSelectModule,
    SharedPipesModule
  ],
  exports: [CharactersListComponent],
  providers: [OpponentsService]
})
export class CharactersListModule { }
