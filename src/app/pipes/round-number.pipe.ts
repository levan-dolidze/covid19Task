import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roundNumber'
})
export class RoundNumberPipe implements PipeTransform {

  transform(value: number): number|string {
    return  (value) ? `${value.toFixed(2)} %`:`${0} %` ;

  }

}
