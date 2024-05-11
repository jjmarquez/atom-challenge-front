import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss',
})
export class ErrorComponent {
  constructor(private readonly location: Location) {}

  goBack(): void {
    this.location.back();
  }
}
