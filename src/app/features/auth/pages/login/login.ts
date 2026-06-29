import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { LoginRequest } from '../../models/login-request.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  private fb = inject(FormBuilder)
  private authService = inject(AuthService);
  private router = inject(Router)

  loginForm = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  })


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

        localStorage.setItem('user', JSON.stringify(response))

        this.router.navigate(['/'])
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

}
