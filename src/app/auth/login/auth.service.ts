import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class AuthService{
  is_logged_in: boolean = false;

  private login(){
    this.is_logged_in = true;
  }
  private logout(){
    this.is_logged_in = false;
  }
}
