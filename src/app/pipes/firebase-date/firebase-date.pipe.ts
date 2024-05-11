import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firebaseDate',
})
export class FirebaseDatePipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    if (value && value._seconds) {
      const date = new Date(value._seconds * 1000);
      return date;
    }
    return value;
  }
}
