import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, Observable, Subject, throwError, tap, BehaviorSubject } from "rxjs";
import { UserModel } from "./user.model";


@Injectable({ providedIn: 'root' })
export class AuthService{

  //user = new Subject<UserModel>; SE USARÁ MEJOR BEHAVIORSUBJECT PARA OBTENER EL VALOR INCLUSIVE SI AL MOMENTO DE SUSCRIBIRSE DE OTRO COMPONENTE TENIA OTRO VALOR
  user = new BehaviorSubject<UserModel|null>(null);


  is_logged_in: boolean = false;
  base_url: string = 'http://angular-api.test/api/';

  constructor(private http: HttpClient, private router: Router) {}

  public login(email: string, password: string): Observable<any>{
    return this.http.post<UserModel>(
      this.base_url+'login',
      {
        email: email,
        password: password
      }
    ).pipe(
      catchError(this.handleError)
      ,
      tap( res => {
        this.handleAuthentication(res.email, res.id, res.token);
      }
      ));
  }


  public logout(){
    this.is_logged_in = false;
    this.user.next(null);
    localStorage.removeItem('userData');
  }

  autoLogin(){
    const userData: UserModel  = JSON.parse(localStorage.getItem('userData')!);

    if(!userData)
    {
      return;
    }
    this.user.next(userData);

  }

  private handleAuthentication(email: string, id: string, token: string){
    let user_aux = new UserModel(email, id, token);
    this.user.next(user_aux);
    localStorage.setItem('userData', JSON.stringify(user_aux));
  }

  private handleError(errorRes: HttpErrorResponse){
    let errorMessage = 'An unknown error ocurred!';
        if(!errorRes.error || !errorRes.error.error)
          return throwError(errorMessage);
        return throwError(errorMessage);
  }

}
