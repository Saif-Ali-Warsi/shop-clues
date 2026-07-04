import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../features/cart/services/cart-service';
import { AuthService } from '../../../features/auth/services/auth-service';


@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar implements OnInit {

  private cartService = inject(CartService);
  authService = inject(AuthService);

  cartCount = this.cartService.cartCount;

  ngOnInit(): void {

  }

  logout() {
    this.authService.logout()
  }


}
