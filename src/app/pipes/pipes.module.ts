import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirebaseDatePipe } from './firebase-date/firebase-date.pipe';

@NgModule({
  declarations: [FirebaseDatePipe],
  imports: [CommonModule],
  exports: [FirebaseDatePipe],
})
export class PipesModule {}
