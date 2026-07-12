import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { LoginRequest } from '../../models/login-request.model';
import { Router } from '@angular/router';
import { NotificationService } from '../../../../shared/services/notification-service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  private notification = inject(NotificationService)
  private fb = inject(FormBuilder)
  private authService = inject(AuthService);
  private router = inject(Router)

  loginForm = this.fb.nonNullable.group({
    username: ['emilys', Validators.required],
    password: ['emilyspass', Validators.required],
  })

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }


  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const request: LoginRequest = {
      ...this.loginForm.getRawValue(),
      expiresInMins: 30
    }

    this.authService.login(request).subscribe({
      next: (response) => {
        localStorage.setItem('accessToken', response.accessToken);

        localStorage.setItem('user', JSON.stringify(response));

        localStorage.setItem('refreshToken', response.refreshToken);

        this.router.navigate(['/'])

        this.notification.success('Login successful. Welcome back!');
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

}
