import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/login/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authservice: AuthService,
    private router: Router, ) { }

  ngOnInit(): void {
  }

  onLogout(){
    console.log('logout');
    this.authservice.is_logged_in = false;
    this.router.navigate(['login']);
  }

}
