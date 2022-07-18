import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { UsersService } from './users.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  usersIndex!: Subscription;

  constructor(
    private router: Router,
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.usersIndex = this.usersService.index().subscribe(
      resData => {
        console.log(resData);
      },
      errorData => {
        console.log(errorData);
      }
    );
  }

}
