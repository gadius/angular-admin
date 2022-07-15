import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from "rxjs";


@Injectable({ providedIn: 'root' })
export class AuthService{
  is_logged_in: boolean = false;

  base_url: string = 'http://angular-api.test/api/';

  constructor(private http: HttpClient, private router: Router) {}

  public login(email: string, password: string): Observable<any>{
    return this.http.post(
      this.base_url+'login',
      {
        email: email,
        password: password
      }
    ).pipe(
      catchError(this.handleError));
  }


  public logout(){
    this.is_logged_in = false;
  }

  private handleError(errorRes: HttpErrorResponse){
    let errorMessage = 'An unknown error ocurred!';
        if(!errorRes.error || !errorRes.error.error)
          return throwError(errorMessage);
        return throwError(errorMessage);
  }

}
