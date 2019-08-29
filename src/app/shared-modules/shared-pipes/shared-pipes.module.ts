import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Pipes
import { OrderAzPipe } from './order-az.pipe';
import { TruncatePipe } from './truncate.pipe';

@NgModule({
  declarations: [
    OrderAzPipe,
    TruncatePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    OrderAzPipe,
    TruncatePipe
  ]
})
export class SharedPipesModule { }
