import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

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
    console.log("submit");
    this.authservice.is_logged_in = true;
    console.log(this.loginForm.get('email')?.value);
    console.log(this.loginForm.value);
    //this.router.navigate(['admin/welcome']);
  }

  get f() { return this.loginForm.controls; }


}
