import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { OtploginComponent } from './otplogin/otplogin.component';

@NgModule({
  declarations: [AppComponent,LoginComponent, SignupComponent, HomeComponent, WelcomeComponent, AdminLoginComponent, ContactComponent, AboutComponent, OtploginComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule, ReactiveFormsModule,GoogleMapsModule
],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
