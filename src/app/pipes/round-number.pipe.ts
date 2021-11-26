import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roundNumber'
})
export class RoundNumberPipe implements PipeTransform {
//ვამრგვალებ მნიშვნელობას და % ის ნიშანს ვაყოლებ, ასევე თუ მნიშნელობა იქნება ცარიელი დეფოლტად 0 ს წამოიღებს 
  transform(value: number): number|string {
    return  (value) ? `${value.toFixed(2)} %`:`${0} %` ;

  }

}
