import { Component, OnInit, inject, signal, ElementRef, viewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CartService } from '../../../features/cart/services/cart-service';
import { AuthService } from '../../../features/auth/services/auth-service';
import { ProductService } from '../../../features/products/services/product-service';
import { Category } from '../../../features/products/models/category.model';
import { Search } from '../../../features/products/components/search/search';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, Search],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar implements OnInit {

  private cartService = inject(CartService);
  authService = inject(AuthService);
  private productService = inject(ProductService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  categoryContainer = viewChild<ElementRef<HTMLDivElement>>('categoryContainer');

  showLeftButton = signal(false);
  showRightButton = signal(true);

  cartCount = this.cartService.cartCount;
  categories: Category[] = [];

  search = '';

  ngOnInit(): void {
    this.loadCategories();

    this.route.queryParams.subscribe(params => {
      this.search = params['search'] ?? '';
    })
  }


  // Method to check scroll boundaries
  updateButtonVisibility() {
    const container = this.categoryContainer()?.nativeElement;
    if (!container) return;

    // Show left button only if we have scrolled away from the absolute left (0)
    this.showLeftButton.set(container.scrollLeft > 5); 

    // Show right button only if there is remaining space left to scroll
    const hasMoreToScroll = container.scrollLeft + container.clientWidth < container.scrollWidth - 5;
    this.showRightButton.set(hasMoreToScroll);
  }

  scrollTabs(direction: 'left' | 'right') {
    const container = this.categoryContainer()?.nativeElement;
    if (!container) return;

    const scrollAmount = 200; 

    if (direction === 'left') {
      container.scrollTo({
        left: container.scrollLeft - scrollAmount,
        behavior: 'smooth'
      });
    } else {
      container.scrollTo({
        left: container.scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }

    setTimeout(() => this.updateButtonVisibility(), 300);
  }

  logout() {
    this.authService.logout();
  }

  loadCategories() {
    this.productService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories
      }
    })
  }

  onSearch(query: string) {
    this.router.navigate(
      ['/products'],
      {
        queryParams: {
          search: query
        },
        queryParamsHandling: 'merge'
      }
    )
  }


}
