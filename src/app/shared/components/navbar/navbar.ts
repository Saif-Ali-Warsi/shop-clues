import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../features/cart/services/cart-service';


@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar implements OnInit {

  private cartService = inject(CartService);

  cartCount = this.cartService.cartCount;

  navItems = [
    {
      label: 'Products',
      path: '/'
    },
    {
      label: 'Login',
      path: '/login'
    },
    {
      label: 'Cart',
      path: '/cart'
    },
    {
      label: 'Profile',
      path: '/profile'
    },
    {
      label: 'bugs',
      path: '/bugs'
    }
  ]



  ngOnInit(): void {

  }




}
