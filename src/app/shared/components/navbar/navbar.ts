import { Component, OnInit, inject, signal, ElementRef, viewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CartService } from '../../../features/cart/services/cart-service';
import { AuthService } from '../../../features/auth/services/auth-service';
import { ProductService } from '../../../features/products/services/product-service';
import { Category } from '../../../features/products/models/category.model';
import { Search } from '../../../features/products/components/search/search';
import { NotificationService } from '../../services/notification-service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, Search],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar implements OnInit {
  private notification = inject(NotificationService);
  private cartService = inject(CartService);
  authService = inject(AuthService);
  private productService = inject(ProductService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  categoryContainer = viewChild<ElementRef<HTMLDivElement>>('categoryContainer');

  showLeftButton = signal(false);
  showRightButton = signal(true);
  isMenuOpen = signal(false); // Manages sidebar state

  cartCount = this.cartService.cartCount;
  categories: Category[] = [];
  search = '';

  ngOnInit(): void {
    this.loadCategories();
    this.route.queryParams.subscribe(params => {
      this.search = params['search'] ?? '';
    });
  }

  toggleMenu() {
    this.isMenuOpen.update(val => !val);
      if (this.isMenuOpen()) {
    document.body.classList.add('no-scroll');
  } else {
    document.body.classList.remove('no-scroll');
  }
  }

  closeMenu() {
    this.isMenuOpen.set(false);
    document.body.classList.remove('no-scroll');
  }

  updateButtonVisibility() {
    const container = this.categoryContainer()?.nativeElement;
    if (!container) return;

    this.showLeftButton.set(container.scrollLeft > 5);
    const hasMoreToScroll = container.scrollLeft + container.clientWidth < container.scrollWidth - 5;
    this.showRightButton.set(hasMoreToScroll);
  }

  scrollTabs(direction: 'left' | 'right') {
    const container = this.categoryContainer()?.nativeElement;
    if (!container) return;

    const scrollAmount = 200;
    if (direction === 'left') {
      container.scrollTo({ left: container.scrollLeft - scrollAmount, behavior: 'smooth' });
    } else {
      container.scrollTo({ left: container.scrollLeft + scrollAmount, behavior: 'smooth' });
    }

    setTimeout(() => this.updateButtonVisibility(), 300);
  }

  logout() {
    this.authService.logout();
    this.notification.success('Logged out successfully.');
  }

  loadCategories() {
    this.productService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      }
    });
  }

  onSearch(query: string) {
    this.router.navigate(
      ['/products'],
      { queryParams: { search: query }, queryParamsHandling: 'merge' }
    );
  }
}