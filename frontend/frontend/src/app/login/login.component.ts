import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent {
  loginForm: FormGroup;  
  errorMessageLogin = '';
  loginMessage: string = '';  // Message to display
  isSuccess: boolean = true;  // Flag to determine message type

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response: any) => {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/home']);
          this.loginMessage = 'You have logged in successfully!';
          this.isSuccess = true;  // Set success flag to true
        },  
        error: (err) => {
          this.errorMessageLogin = 'Invalid email or password';
          this.loginMessage = 'Incorrect username or password. Please try again.';
         this.isSuccess = false;  // Set success flag to false
        }
      });
    }
  }
}


