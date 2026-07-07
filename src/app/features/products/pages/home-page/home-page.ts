import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { SwiperOptions } from 'swiper/types';
import { ProductService } from '../../services/product-service';
import { Category } from '../../models/category.model';
import { CategoryCard } from '../../components/category-card/category-card';


@Component({
  selector: 'app-home-page',
  imports: [CategoryCard],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage implements OnInit {

  private productService = inject(ProductService);

  categories: Category[] = []

  slides = [
    { img: "https://cdn2.shopclues.com/images/banners/2026/may/14/Featurephone-Web-14may26.jpg" },
    { img: "https://cdn2.shopclues.com/images/banners/2025/Oct/16/Intell-Web-16Oct2025.jpg" },
  ];

  swiperConfig: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    grabCursor: true,

    navigation: true,
    pagination: {
      clickable: true,
    },

    speed: 600,

    breakpoints: {
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
    },
  };

  ngOnInit() {
    this.loadCategories()
  }

  loadCategories() {
    this.productService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories
      }
    })
  }


}
