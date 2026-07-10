import { Injectable, signal, computed, inject } from '@angular/core';
import { CartItem } from '../models/cart.model';
import { Product } from '../../products/models/product.model';
import { NotificationService } from '../../../shared/services/notification-service';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  private readonly CART_KEY = 'cart';

  private notification = inject(NotificationService);

  cartItems = signal<CartItem[]>(this.getCartItems());

  cartCount = computed(() => {
    return this.cartItems().reduce((total, item) => {
      return total = total + item.quantity
    }, 0)
  })

  getCartItems(): CartItem[] {
    const cart = localStorage.getItem(this.CART_KEY)

    if (!cart) {
      return [];
    }

    return JSON.parse(cart)
  }

  private saveCartItems(CartItems: CartItem[]) {
    localStorage.setItem(
      this.CART_KEY,
      JSON.stringify(CartItems)
    )
  }

  addToCart(product: Product) {
    const cartItems = this.getCartItems();

    const existingItem = cartItems.find(
      item => item.id === product.id
    )

    if (existingItem) {
      existingItem.quantity++;
    } else {
      cartItems.push({
        ...product,
        quantity: 1
      });
    }

    this.saveCartItems(cartItems);
    this.cartItems.set(cartItems);

    this.notification.success(`${product.title} added to cart.`);
  }

  increaseQuantity(productId: number) {
    const cartItems = this.getCartItems();

    const item = cartItems.find(
      cartItem => cartItem.id === productId
    );

    if (!item) {
      return;
    }

    item.quantity++;

    this.saveCartItems(cartItems);
    this.cartItems.set(cartItems);

    this.notification.info('Quantity incresed.')
  }

  decreaseQuantity(productId: number) {
    const cartItems = this.getCartItems();

    const item = cartItems.find(
      cartItem => cartItem.id === productId
    );

    if (!item) {
      return;
    }

    if (item.quantity === 1) {
      const updatedCart = cartItems.filter(
        cartItem => cartItem.id !== productId
      );

      this.saveCartItems(updatedCart);
      this.cartItems.set(updatedCart);

      return;
    }

    item.quantity--;

    this.saveCartItems(cartItems);
    this.cartItems.set(cartItems);

    this.notification.info('Quantity decreased.')

  }

  removeItem(productId: number) {

    const cartItems = this.getCartItems();

    const updatedCart = cartItems.filter(
      cartItem => cartItem.id !== productId
    );

    this.saveCartItems(updatedCart);
    this.cartItems.set(updatedCart);

    this.notification.warning('Product removed from cart.')

  }

  totalPrice = computed(() => {
    return this.cartItems().reduce((total, item) => {
      return total + (item.price * item.quantity)
    }, 0)
  });

  clearCart() {
    localStorage.removeItem('cart');
    this.cartItems.set([]);

    this.notification.warning('Cart cleared.')
  }

}
