import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import {
  catchError,
  Observable,
  Subject,
  throwError,
  tap,
  BehaviorSubject,
} from 'rxjs';
import { UserModel } from './user.model';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  //user = new Subject<UserModel>; SE USARÁ MEJOR BEHAVIORSUBJECT PARA OBTENER EL VALOR INCLUSIVE SI AL MOMENTO DE SUSCRIBIRSE DE OTRO COMPONENTE TENIA OTRO VALOR
  user = new BehaviorSubject<UserModel | null>(null);
  private tokenExpirationTimer: any;

  is_logged_in: boolean = false;
  base_url: string = environment.api_url;

  constructor(private http: HttpClient, private router: Router) {}

  public login(email: string, password: string): Observable<any> {
    return this.http
      .post<UserModel>(this.base_url + 'login', {
        email: email,
        password: password,
      })
      .pipe(
        catchError(this.handleError),
        tap((res) => {
          this.handleAuthentication(res.email, res.id, res.token);
        })
      );
  }

  public logout() {
    this.is_logged_in = false;
    this.user.next(null);
    localStorage.removeItem('userData');
    if(this.tokenExpirationTimer)
    {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogin() {
    const userData: UserModel = JSON.parse(localStorage.getItem('userData')!);

    if (!userData) {
      return;
    }
    this.user.next(userData);
    this.autoLogout(20000);
  }

  autoLogout(expirationDuration: number){
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(email: string, id: string, token: string) {
    let user_aux = new UserModel(email, id, token);
    this.user.next(user_aux);
    localStorage.setItem('userData', JSON.stringify(user_aux));
    this.autoLogout(20000);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error ocurred!';
    if (!errorRes.error || !errorRes.error.error)
      return throwError(errorMessage);
    return throwError(errorMessage);
  }
}
