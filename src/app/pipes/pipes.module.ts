import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirebaseDatePipe } from './firebase-date/firebase-date.pipe';
import { SafeHtmlPipe } from './safe-html/safe-html.pipe';

@NgModule({
  declarations: [FirebaseDatePipe, SafeHtmlPipe],
  imports: [CommonModule],
  exports: [FirebaseDatePipe, SafeHtmlPipe],
})
export class PipesModule {}
