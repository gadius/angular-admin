import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, throwError } from "rxjs";


@Injectable({ providedIn: 'root' })
export class AuthService{
  is_logged_in: boolean = false;

  base_url: string = 'http://angular-api.test/api/';

  constructor(private http: HttpClient, private router: Router) {}

  public login(email: string, password: string){
    return this.http.post(
      this.base_url+'login',
      {
        email: email,
        password: password
      }
    ).pipe(
      catchError(errorRes => {
          let errorMessage = 'An unknown error ocurred!';
          if(!errorRes.error || !errorRes.error.error)
            return throwError(errorMessage);

          return throwError(errorMessage);
        }
    ));
  }


  public logout(){
    this.is_logged_in = false;
  }
}
