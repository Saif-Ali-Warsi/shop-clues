import { Injectable, signal, computed } from '@angular/core';
import { CartItem } from '../models/cart.model';
import { Product } from '../../products/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  private readonly CART_KEY = 'cart';

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

  }

  removeItem(productId: number) {

    const cartItems = this.getCartItems();

    const updatedCart = cartItems.filter(
      cartItem => cartItem.id !== productId
    );

    this.saveCartItems(updatedCart);
    this.cartItems.set(updatedCart);

  }

  totalPrice = computed(() => {
    return this.cartItems().reduce((total, item) => {
      return total + (item.price * item.quantity)
    }, 0)
  });

  clearCart() {
    localStorage.removeItem('cart');
    this.cartItems.set([]);
  }

}
