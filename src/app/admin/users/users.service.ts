import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, Observable, Subject, throwError, tap, BehaviorSubject } from "rxjs";



@Injectable({ providedIn: 'root' })
export class UsersService{

  base_url: string = 'http://angular-api.test/api/';

  constructor(private http: HttpClient, private router: Router) {}

  public index(): Observable<any>{
    return this.http.get(
      this.base_url+'users/index'
    ).pipe(
      catchError(this.handleError)
      ,
      tap( res => {
        //this.handleAuthentication(res.email, res.id, res.token);
      }
      ));
  }


  private handleError(errorRes: HttpErrorResponse){
    let errorMessage = 'An unknown error ocurred!';
        if(!errorRes.error || !errorRes.error.error)
          return throwError(errorMessage);
        return throwError(errorMessage);
  }

}
