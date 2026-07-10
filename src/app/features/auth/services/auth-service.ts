import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment/environment';
import { LoginRequest } from '../models/login-request.model';
import { LoginResponse } from '../models/login-response.model';
import { Router } from '@angular/router';
import { CartService } from '../../cart/services/cart-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly baseUrl = environment.apiUrl;

  private http = inject(HttpClient);
  private router = inject(Router);
  private cartService = inject(CartService);

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.baseUrl}/auth/login`, request
    )
  }

  logout() {
    localStorage.removeItem('accessToken');
    
    localStorage.removeItem('user');

    // this.cartService.clearCart();

    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    return !!localStorage.getItem('accessToken')
  }

}
