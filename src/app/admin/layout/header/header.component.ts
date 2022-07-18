import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/login/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false;
  private userSub!: Subscription;

  constructor(private authService: AuthService,
    private router: Router, private auth: AuthService ) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user; //regresa booleano si no es null
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  onLogout(){
    this.authService.logout();
    //this.router.navigate(['login']);

  }

}
