import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({ providedIn: 'root' })
export class AuthService{
  is_logged_in: boolean = false;

  base_url: string = 'http://angular-api.test/api/';

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string){
    return this.http.post(
      this.base_url+'login',
      {
        email: email,
        password: password
      }
    );
  }


  logout(){
    this.is_logged_in = false;
  }
}
