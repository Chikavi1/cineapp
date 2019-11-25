import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fechascut'
})
export class FechascutPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
