import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TaskItem {
  title: string;
  description: string;
}

@Component({
  selector: 'app-bugs',
  imports: [CommonModule],
  templateUrl: './bugs.html',
  styleUrl: './bugs.scss',
})
export class Bugs {
tasks: TaskItem[] = [
    {
      title: 'Event Bubbling',
      description: 'Product card on listing add button check.'
    },
    {
      title: 'Authentication Flow',
      description: 'Hide login/signup options for authenticated users.'
    },
    {
      title: 'Cart Price Precision',
      description: 'Properly format and handle floating-point integers in the cart summary to prevent rounding errors.'
    },
    {
      title: 'Footer Redesign',
      description: 'Modernize the footer layout, update links, and improve overall aesthetics.'
    },
    {
      title: 'Header Navigation',
      description: 'Add a dynamic category dropdown/menu to the main header.'
    },
    {
      title: 'Landing Page',
      description: 'Design and build a comprehensive, engaging homepage.'
    },
    {
      title: '"About Us" Section',
      description: 'Create a dedicated section or page detailing the brand/company story.'
    },
    {
      title: '404 Not Found Page',
      description: 'Implement a user-friendly, branded custom 404 error page.'
    },
    {
      title: 'Global Error Handling',
      description: 'Build a robust system to gracefully catch and display runtime/API errors.'
    }
  ];
}
