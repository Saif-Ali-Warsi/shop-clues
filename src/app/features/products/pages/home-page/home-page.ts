import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { CategoryCard } from '../../components/category-card/category-card';
import { Product } from '../../models/product.model';
import { ProductCard } from '../../components/product-card/product-card';


@Component({
  selector: 'app-home-page',
  imports: [ProductCard, CategoryCard],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage implements OnInit {


  private productService = inject(ProductService);

  trendingProducts: Product[] = [];
  bestSeller: Product[] = [];



  homeBanners = [
    {
      desktopImgUrl: [
        {
          img: 'https://www.image2url.com/r2/default/images/1783437767428-c5690603-4599-4190-9471-c523d1494dcf.jpg'
        },
        {
          img: 'https://www.image2url.com/r2/default/images/1783437767428-c58fb5f8-5ada-4b4c-bc99-faa4355c6ad7.jpg'
        }
      ],
      mobileImgUrl: [
        {
          img: 'https://cdn2.shopclues.com/images/banners/2026/april/07/rocket-deal-app-07April2026.jpg'
        },
        {
          img: 'https://cdn2.shopclues.com/images/banners/2025/Oct/16/Intell-App-16Oct2025.jpg'
        }
      ]
    }
  ];
  

  quickCards = [
    { img: "https://www.image2url.com/r2/default/images/1783438427777-05fca0a0-c04a-4197-83c3-99800c8a908f.webp" },
    { img: "https://www.image2url.com/r2/default/images/1783438427800-56ff0704-9c17-4554-b515-9f875cb96871.webp" },
    { img: "https://www.image2url.com/r2/default/images/1783438451154-c5381ed2-a7a2-4397-88b8-a36f93204234.webp" },
    { img: "https://www.image2url.com/r2/default/images/1783438454572-8e1228b0-2b6b-4903-9c3d-d76b10c775c6.webp" },

  ];

  ngOnInit() {
    this.loadTrendingProducts();
    this.bestSellerProducts();
  }

  loadTrendingProducts() {
    this.productService.getProducts().subscribe({
      next: (response) => {
        this.trendingProducts = response.products.splice(0, 8);
      }
    })
  }

  bestSellerProducts() {
    this.productService.getProducts().subscribe({
      next: (response) => {
        this.bestSeller = response.products.splice(8, 8);
      }
    })
  }


}
