import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { FrameDataRoutingModule } from './frame-data.routing';
import { CharactersListModule } from '../shared-modules/characters-list/characters-list.module';
import { MatTableModule } from '@angular/material';

// Components
import { FrameDataComponent } from './frame-data.component';

// Services
import { OpponentsService } from '../opponents/opponents.service';

@NgModule({
  declarations: [FrameDataComponent],
  imports: [
    CommonModule,
    FrameDataRoutingModule,
    CharactersListModule,
    MatTableModule
  ],
  providers: [OpponentsService]
})
export class FrameDataModule { }
