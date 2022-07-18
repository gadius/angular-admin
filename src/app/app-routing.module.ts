import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { UsersComponent } from './admin/users/users.component';
import { WelcomeComponent } from './admin/welcome/welcome.component';
import { AuthGuard } from './auth/login/auth.guard';
import { LoginComponent } from './auth/login/login.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard],
    children: [
      { path: 'welcome', component: WelcomeComponent },
      { path: 'users', component: UsersComponent },
    ]
  },
  //{ path: 'welcome', component: WelcomeComponent },

  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
