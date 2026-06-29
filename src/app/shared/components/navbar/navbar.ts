import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { User } from '../../../features/auth/models/user.model';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar implements OnInit {

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
    }
  ]

  

  ngOnInit(): void {
    
  }




}
