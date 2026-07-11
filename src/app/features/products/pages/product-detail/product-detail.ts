import { Component, inject, OnInit, signal } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product-service';
import { switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../../cart/services/cart-service';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-product-detail',
  imports: [DatePipe],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss',
})
export class ProductDetail implements OnInit {


  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private router = inject(Router);

  product = signal<Product | undefined>(undefined);

  selectedImage: any = '';

  ngOnInit() {
    this.loadProduct();
  }

  loadProduct() {
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = Number(params.get('id'));
        return this.productService.getProductById(id)
      })
    ).subscribe({
      next: (product) => {
        this.product.set(product)

        this.selectedImage = product.images[0];
      },

    })
  }

  addToCart() {
    const product = this.product();

    if (!product) return;

    this.cartService.addToCart(product);
  }

  buyNow() {
    const product = this.product();

    if (!product) return;

    // this.cartService.clearCart();

    this.cartService.addToCart(product);

    this.router.navigate(['/checkout']);
  }

  changeImage(image: string) {
    this.selectedImage = image;
  }


}
