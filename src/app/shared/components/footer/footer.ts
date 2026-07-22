import { Component, inject, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-footer',
  imports: [DatePipe],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer implements OnInit {

  private router = inject(Router)
  currentYear = Date();

  showFooter = true;

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {

        const hiddenRoutes = [
          '/checkout',
          '/order-success'
        ];

        this.showFooter = !hiddenRoutes.some(route =>
          this.router.url.startsWith(route)
        );

      });
  }

}
