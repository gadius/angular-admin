import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { WelcomeComponent } from './admin/welcome/welcome.component';
import { HeaderComponent } from './admin/layout/header/header.component';
import { FooterComponent } from './admin/layout/footer/footer.component';
import { MenuComponent } from './admin/layout/menu/menu.component';
import { AdminComponent } from './admin/admin.component';
import { UsersComponent } from './admin/users/users.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AuthInterceptorService } from './auth/login/auth-interceptor.service';
import { AlertComponent } from './shared/alert/alert.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WelcomeComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    AdminComponent,
    UsersComponent,
    LoadingSpinnerComponent,
    AlertComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
