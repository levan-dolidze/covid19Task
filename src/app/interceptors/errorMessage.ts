import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';


//გამოყენებულია unexpected ტიპის ერორ მესიჯი , რომელიც გაჩნდება იმ შემთხვევაში როდესაც მისამართზე მიკიტხვისას გზაში network is down,
//მაგალიტად URL მისამართში შეცდომით ავურევთ სიმბოლოებს 

@Injectable()
export class ContentTypeInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(`ბაზიდან ინფორმაცია არ ბრუნდება,გადაამოწმეთ URL `);
        })
      )

  };
};
