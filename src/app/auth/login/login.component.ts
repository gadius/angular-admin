import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading = false;

  constructor(
    private router: Router,
    private authservice: AuthService,
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(){
    this.loginForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }

  onSubmit(){
    if(!this.loginForm.valid)
      return;
    this.isLoading = true;
    let email: string = '';
    let password: string = '';

    email = this.loginForm.get('email')!.value;
    password = this.loginForm.get('password')!.value;

    this.authservice.login(email,password).subscribe(
    resData => {
      console.log(resData);
      this.isLoading = false;
      this.authservice.is_logged_in = true;
    },
    errorMessage => {
      this.isLoading = false;
      alert(errorMessage);
    }
    );



    //this.router.navigate(['admin/welcome']);
  }



}
