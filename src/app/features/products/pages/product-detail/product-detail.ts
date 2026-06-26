import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product-service';
import { switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-product-detail',
  imports: [],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss',
})
export class ProductDetail implements OnInit {


  private route = inject(ActivatedRoute)
  private productService = inject(ProductService)

  product: Product | undefined;

  ngOnInit() {
    this.loadProduct()
  }

  loadProduct() {
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = Number(params.get('id'));
        return this.productService.getProductById(id)
      })
    ).subscribe({
      next: (product) => {
        this.product = product;
      },
      error: (error) => {

      }
    })
  }


}
